# AI Debugger (DEBUG_OS_v1.0)

An advanced, AI-powered code debugging platform built with modern web technologies. This application provides developers with a sleek, responsive interface to paste broken code or error logs and instantly receive context-aware fixes and detailed explanations powered by the Gemini AI API.

## Key Features

- **Real-Time Context Chat:** A split-panel interface keeps your source code pinned on the left while you chat with the AI on the right. The AI retains context of your specific code block throughout the conversation.
- **Secure Authentication:** Integrated Firebase Authentication supports both traditional Email/Password sign-ups and rapid Google OAuth logins. The application features protected routing to ensure only authenticated developers can access the dashboard.
- **Premium UI/UX:** A modern, conversion-focused landing page featuring glassmorphism elements, animated text gradients, and a sleek dark mode aesthetic.
- **Markdown Rendering:** AI responses are beautifully rendered using custom markdown parsing, supporting syntax-highlighted code blocks for easy readability.
- **Fully Responsive:** The interface seamlessly adapts to any screen size, transitioning from a side-by-side view on desktops to a vertical stacked layout on mobile devices.
- **Personalized Experience:** The application securely captures user display names and integrates them into the dashboard header and the AI's initial greeting.

## Technology Stack

- **Frontend Framework:** React (Vite)
- **Routing:** React Router v6
- **Styling:** Vanilla CSS (Custom Design System)
- **Authentication:** Firebase (Google Auth Provider & Email/Password)
- **AI Integration:** Google Gemini 2.5 Flash API
- **Hosting:** Ready for deployment on Vercel

## Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ai-debugger
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Firebase Configuration:**
   Update the `firebaseConfig` object in `src/utils/firebase.js` with your specific Firebase project credentials. Ensure that both Google and Email/Password providers are enabled in your Firebase Console, and that your deployment domain is whitelisted.

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Deployment

This project is optimized for deployment on platforms like Vercel. Simply import your GitHub repository to Vercel, add your `VITE_GEMINI_API_KEY` to the Vercel Environment Variables dashboard, and deploy. Ensure you also add your Vercel URL to the Firebase Authorized Domains list.
