# AI Debugger

AI Debugger is a web-based, AI-powered tool designed to help developers quickly analyze code, identify errors, and find solutions. Built with a sleek split-panel interface, it leverages the Google Gemini 2.5 Flash model to provide real-time, conversational debugging assistance.

## Features

* **Split-Panel Interface:** A clean, dual-pane layout allowing you to view your source code or error logs alongside the AI chat.
* **Error Analysis:** Paste your code or error messages and let the AI analyze the root cause of the issue.
* **Conversational Debugging:** Follow up on the AI's analysis by asking questions in the integrated chat interface. The AI maintains the context of your previous messages and the original source code.
* **Markdown Support:** The AI's responses are beautifully rendered using a custom Markdown parser, supporting headers, bold text, and formatted paragraphs.
* **Code Block Utilities:** Code snippets provided by the AI feature syntax highlighting and include a convenient "Copy" button for easy clipboard access.

## Technologies Used

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **AI Integration:** Google Gemini API (gemini-2.5-flash)

## Setup and Installation

1. **Clone or Download the Repository:**
   Ensure you have all the project files (`ai_debugger.html`, `styles.css`, `script.js`) in a single directory.

2. **Obtain a Gemini API Key:**
   * Go to Google AI Studio to generate an API key.
   * Open `script.js` in your preferred text editor.
   * Locate the `GEMINI_API_KEY` constant at the top of the file:
     ```javascript
     const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
     ```
   * Replace `YOUR_API_KEY_HERE` with your actual Gemini API key.

3. **Run the Application:**
   * Simply open the `ai_debugger.html` file in any modern web browser. No local server is required for basic functionality.

## Usage

1. Open the application in your browser.
2. In the **Left Panel**, paste the source code you are working on or the error log you received.
3. Click the **Analyze** button to send the code to the AI.
4. Wait for the AI to process the request and provide an explanation or a corrected code snippet in the **Right Panel**.
5. If you need further clarification, use the text input at the bottom of the right panel to ask follow-up questions.
6. Use the **Copy** buttons on any provided code blocks to copy the solutions directly to your clipboard.
7. Click the **Clear** button in the left panel to start a new debugging session.
