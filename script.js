// --- CONFIGURATION ---
// Replace with your actual Gemini API Key
const GEMINI_API_KEY = "";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// --- DOM ELEMENTS ---
const sourceInput = document.getElementById('source-input');
const analyzeBtn = document.getElementById('analyze-btn');
const clearBtn = document.getElementById('clear-btn');
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const loadingIndicator = document.getElementById('loading-indicator');

// --- STATE ---
let chatHistory = [];

// --- EVENT LISTENERS ---
analyzeBtn.addEventListener('click', handleAnalyze);

clearBtn.addEventListener('click', () => {
    sourceInput.value = '';
});

sendBtn.addEventListener('click', handleSendChat);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendChat();
});

// --- FUNCTIONS ---

async function handleAnalyze() {
    const code = sourceInput.value.trim();
    if (!code) {
        alert("Please paste some code or an error message to analyze.");
        return;
    }

    const prompt = `I am encountering an issue with the following code/error. Please analyze it, explain the problem, and provide corrected code if applicable.\n\nCode/Error:\n${code}`;

    appendMessage('user', "Analyze the code/error provided in the left panel.");

    await processAIRequest(prompt);
}

async function handleSendChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';

    appendMessage('user', text);

    let prompt = text;
    if (chatHistory.length === 0 && sourceInput.value.trim() !== '') {
        prompt = `Context Code/Error:\n${sourceInput.value.trim()}\n\nUser Question: ${text}`;
    }

    await processAIRequest(prompt);
}

async function processAIRequest(userPrompt) {
    chatHistory.push({
        "role": "user",
        "parts": [{ "text": userPrompt }]
    });

    loadingIndicator.classList.add('active');
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE" || !GEMINI_API_KEY) {
            throw new Error("Gemini API key is not configured. Please add your key to the JS file.");
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: chatHistory,
                systemInstruction: {
                    role: "system",
                    parts: [{ text: "You are an expert AI Debugger Assistant. Provide clear, concise explanations for errors or code issues. When providing code fixes, wrap them in standard Markdown code blocks with the language specified. Do not use overly long pleasantries. Be direct and helpful." }]
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "API request failed");
        }

        const aiText = data.candidates[0].content.parts[0].text;

        chatHistory.push({
            "role": "model",
            "parts": [{ "text": aiText }]
        });

        appendMessage('ai', aiText);

    } catch (error) {
        console.error("Error:", error);
        appendMessage('ai', `**Error:** ${error.message}\n\nPlease check your API key and network connection.`);
    } finally {
        loadingIndicator.classList.remove('active');
    }
}

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;

    if (role === 'user') {
        msgDiv.textContent = text;
    } else {
        const aiHeader = `
            <div class="ai-header">
                <svg class="ai-icon" viewBox="0 0 24 24"><path d="M21,11h-1.06c-0.23-1.61-1.03-3.04-2.19-4.14l0.75-0.75c0.39-0.39,0.39-1.02,0-1.41c-0.39-0.39-1.02-0.39-1.41,0l-0.86,0.86 C14.9,5.01,13.5,4.6,12,4.6s-2.9,0.41-4.23,0.96L6.91,4.71c-0.39-0.39-1.02-0.39-1.41,0c-0.39,0.39-0.39,1.02,0,1.41l0.75,0.75 C5.09,7.96,4.29,9.39,4.06,11H3c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h1v1c0,2.21,1.79,4,4,4h8c2.21,0,4-1.79,4-4v-1h1c1.1,0,2-0.9,2-2 v-2C23,11.9,22.1,11,21,11z M10,15H8v-2h2V15z M16,15h-2v-2h2V15z"/></svg>
                AI Debugger
            </div>`;
        msgDiv.innerHTML = aiHeader + parseMarkdown(text);
    }

    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function parseMarkdown(text) {
    let html = '';
    const blocks = text.split('\`\`\`');

    for (let i = 0; i < blocks.length; i++) {
        if (i % 2 === 0) {
            let paragraphBlock = blocks[i].trim();
            if (paragraphBlock) {
                let lines = paragraphBlock.split('\n');
                let parsedText = '';
                let currentP = [];

                for (let line of lines) {
                    let trimmed = line.trim();
                    if (trimmed.startsWith('### ')) {
                        if (currentP.length) { parsedText += `<p>${currentP.join('<br>')}</p>`; currentP = []; }
                        parsedText += `<h3>${trimmed.substring(4)}</h3>`;
                    } else if (trimmed.startsWith('## ')) {
                        if (currentP.length) { parsedText += `<p>${currentP.join('<br>')}</p>`; currentP = []; }
                        parsedText += `<h2>${trimmed.substring(3)}</h2>`;
                    } else if (trimmed.startsWith('# ')) {
                        if (currentP.length) { parsedText += `<p>${currentP.join('<br>')}</p>`; currentP = []; }
                        parsedText += `<h1>${trimmed.substring(2)}</h1>`;
                    } else if (trimmed === '') {
                        if (currentP.length) { parsedText += `<p>${currentP.join('<br>')}</p>`; currentP = []; }
                    } else {
                        currentP.push(line);
                    }
                }
                if (currentP.length) {
                    parsedText += `<p>${currentP.join('<br>')}</p>`;
                }

                parsedText = parsedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                parsedText = parsedText.replace(/\`(.*?)\`/g, '<code>$1</code>');
                html += parsedText;
            }
        } else {
            const lines = blocks[i].trim().split('\n');
            let lang = lines[0].trim();
            let code = '';

            if (lang && !lang.includes(' ') && lines.length > 1) {
                code = lines.slice(1).join('\n');
            } else {
                lang = 'code';
                code = blocks[i].trim();
            }

            html += `
            <div class="code-block-wrapper">
                <div class="code-header">
                    <span class="code-lang">${lang.toUpperCase()}</span>
                    <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                </div>
                <pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>
            </div>`;
        }
    }

    return html;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

window.copyCode = function (btn) {
    const wrapper = btn.closest('.code-block-wrapper');
    const codeEl = wrapper.querySelector('code');
    const text = codeEl.innerText || codeEl.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        btn.innerText = 'Error';
    });
};
