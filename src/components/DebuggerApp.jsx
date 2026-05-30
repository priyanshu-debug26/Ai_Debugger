import { useState, useEffect } from 'react';
import Header from './Header';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { processAIRequest } from '../utils/api';
import { auth } from '../utils/firebase';

export default function DebuggerApp() {
    const [sourceCode, setSourceCode] = useState('');
    const [messages, setMessages] = useState([]); // format: { role: 'user'|'model', parts: [{text}], uiText: '...' }
    const [loading, setLoading] = useState(false);
    const [historyLoaded, setHistoryLoaded] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            const saved = localStorage.getItem(`ai_debugger_messages_${auth.currentUser.uid}`);
            if (saved) {
                try {
                    setMessages(JSON.parse(saved));
                } catch(e) {}
            }
            setHistoryLoaded(true);
        }
    }, [auth.currentUser]);

    useEffect(() => {
        if (historyLoaded && auth.currentUser) {
            localStorage.setItem(`ai_debugger_messages_${auth.currentUser.uid}`, JSON.stringify(messages));
        }
    }, [messages, historyLoaded, auth.currentUser]);

    const handleClearHistory = () => {
        setMessages([]);
        if (auth.currentUser) {
            localStorage.removeItem(`ai_debugger_messages_${auth.currentUser.uid}`);
        }
    };

    const handleAnalyze = async () => {
        const code = sourceCode.trim();
        if (!code) {
            alert("Please paste some code or an error message to analyze.");
            return;
        }

        const prompt = `I am encountering an issue with the following code/error. Please analyze it, explain the problem, and provide corrected code if applicable.\n\nCode/Error:\n${code}`;
        const uiText = "Analyze the code/error provided in the left panel.";

        await processMessage(uiText, prompt);
    };

    const handleSendMessage = async (text) => {
        let prompt = text;
        if (messages.length === 0 && sourceCode.trim() !== '') {
            prompt = `Context Code/Error:\n${sourceCode.trim()}\n\nUser Question: ${text}`;
        }
        await processMessage(text, prompt);
    };

    const processMessage = async (uiText, apiPrompt) => {
        const newUserMsg = { role: 'user', parts: [{ text: apiPrompt }], uiText: uiText };
        
        setMessages(prev => [...prev, newUserMsg]);
        setLoading(true);

        try {
            // Reconstruct history without uiText field to match API structure
            const currentHistory = messages.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.parts[0].text }]
            }));
            currentHistory.push({ role: 'user', parts: [{ text: apiPrompt }] });

            const aiText = await processAIRequest(currentHistory);

            const newAiMsg = { role: 'model', parts: [{ text: aiText }], uiText: aiText };
            setMessages(prev => [...prev, newAiMsg]);

        } catch (error) {
            console.error("Error:", error);
            const errorMsg = { 
                role: 'model', 
                parts: [{ text: `**Error:** ${error.message}\n\nPlease check your API key and network connection.` }],
                uiText: `**Error:** ${error.message}\n\nPlease check your API key and network connection.`
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    const userName = auth.currentUser?.displayName || 'Developer';

    return (
        <>
            <Header />
            <div className="main-container">
                <LeftPanel sourceCode={sourceCode} setSourceCode={setSourceCode} onAnalyze={handleAnalyze} />
                <RightPanel messages={messages} loading={loading} onSendMessage={handleSendMessage} userName={userName} onClearHistory={handleClearHistory} />
            </div>
        </>
    );
}


