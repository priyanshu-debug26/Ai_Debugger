import { useNavigate } from 'react-router-dom';

export default function LandingPage({ user }) {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <header className="landing-header">
                <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>DEBUG_OS_v1.0</div>
                <div className="landing-actions">
                    <button className="nav-login-btn" onClick={() => navigate(user ? '/app' : '/auth')}>
                        {user ? 'Dashboard' : 'Log In'}
                    </button>
                </div>
            </header>
            
            <main className="landing-main">
                <div className="hero-section">
                    <h1 className="hero-title">AI-Powered Debugging <br/><span className="text-gradient">Evolved.</span></h1>
                    <p className="hero-subtitle">
                        Paste your code. Understand the error. Get the fix.<br/>
                        All powered by cutting-edge AI.
                    </p>
                    
                    <div className="hero-cta-group">
                        <button className="auth-button" onClick={() => navigate(user ? '/app' : '/auth')}>
                            {user ? 'Open Dashboard' : 'Get Started for Free'}
                        </button>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Real-time Context</h3>
                        <p>Keep your source code pinned while you chat. The AI remembers what you're working on.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Markdown Support</h3>
                        <p>Beautifully rendered explanations and code blocks with syntax highlighting.</p>
                    </div>
                    <div className="feature-card">
                        <h3>One-Click Copy</h3>
                        <p>Instantly copy suggested code fixes and drop them straight into your editor.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
