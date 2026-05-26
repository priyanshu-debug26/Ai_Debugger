import { useState, useRef, useEffect } from 'react';
import { parseMarkdown } from '../utils/markdownParser';

export default function RightPanel({ messages, loading, onSendMessage }) {
    const [inputValue, setInputValue] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        onSendMessage(inputValue.trim());
        setInputValue('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="right-panel">
            <h1>Debug Chat</h1>

            <div className="chat-container" id="chat-container" ref={chatContainerRef}>
                <div className="message ai">
                    <div className="ai-header">
                        <svg className="ai-icon" viewBox="0 0 24 24">
                            <path d="M21,11h-1.06c-0.23-1.61-1.03-3.04-2.19-4.14l0.75-0.75c0.39-0.39,0.39-1.02,0-1.41c-0.39-0.39-1.02-0.39-1.41,0l-0.86,0.86 C14.9,5.01,13.5,4.6,12,4.6s-2.9,0.41-4.23,0.96L6.91,4.71c-0.39-0.39-1.02-0.39-1.41,0c-0.39,0.39-0.39,1.02,0,1.41l0.75,0.75 C5.09,7.96,4.29,9.39,4.06,11H3c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h1v1c0,2.21,1.79,4,4,4h8c2.21,0,4-1.79,4-4v-1h1c1.1,0,2-0.9,2-2 v-2C23,11.9,22.1,11,21,11z M10,15H8v-2h2V15z M16,15h-2v-2h2V15z" />
                        </svg>
                        AI Debugger
                    </div>
                    <p>Hello! I'm ready to help you debug your code. Paste your source code or error logs in the left
                        panel, and click <strong>Analyze</strong> to get started.</p>
                </div>

                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role === 'model' ? 'ai' : 'user'}`}>
                        {msg.role === 'model' && (
                            <div className="ai-header">
                                <svg className="ai-icon" viewBox="0 0 24 24">
                                    <path d="M21,11h-1.06c-0.23-1.61-1.03-3.04-2.19-4.14l0.75-0.75c0.39-0.39,0.39-1.02,0-1.41c-0.39-0.39-1.02-0.39-1.41,0l-0.86,0.86 C14.9,5.01,13.5,4.6,12,4.6s-2.9,0.41-4.23,0.96L6.91,4.71c-0.39-0.39-1.02-0.39-1.41,0c-0.39,0.39-0.39,1.02,0,1.41l0.75,0.75 C5.09,7.96,4.29,9.39,4.06,11H3c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h1v1c0,2.21,1.79,4,4,4h8c2.21,0,4-1.79,4-4v-1h1c1.1,0,2-0.9,2-2 v-2C23,11.9,22.1,11,21,11z M10,15H8v-2h2V15z M16,15h-2v-2h2V15z" />
                                </svg>
                                AI Debugger
                            </div>
                        )}
                        {msg.role === 'model' ? (
                            <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.uiText) }} />
                        ) : (
                            msg.uiText
                        )}
                    </div>
                ))}
            </div>

            <div id="loading-indicator" className={`loading ${loading ? 'active' : ''}`}>AI is thinking...</div>

            <div className="chat-input-container">
                <input 
                    type="text" 
                    id="chat-input" 
                    placeholder="Ask a follow-up question..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                />
                <button id="send-btn" onClick={handleSend} disabled={loading}>
                    <svg viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
