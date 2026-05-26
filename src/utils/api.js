// Use only the environment variable for security
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const processAIRequest = async (chatHistory) => {
    if (GEMINI_API_KEY === "YOUR_API_KEY_HERE" || !GEMINI_API_KEY) {
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

    return data.candidates[0].content.parts[0].text;
};
