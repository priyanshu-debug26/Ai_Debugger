export default function LeftPanel({ sourceCode, setSourceCode, onAnalyze }) {
    return (
        <div className="left-panel">
            <div className="panel-header">
                <h1>AI Debugger</h1>
                <div className="status-container">
                    <div className="status-dot"></div>
                    System Status: Ready
                </div>
            </div>

            <div className="input-section">
                <div className="input-label">Error / Source Code</div>
                <textarea 
                    id="source-input" 
                    placeholder="Paste your code here..."
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                ></textarea>
                <div className="button-group">
                    <button id="analyze-btn" className="btn" onClick={onAnalyze}>Analyze</button>
                    <button id="clear-btn" className="btn" onClick={() => setSourceCode('')}>Clear</button>
                </div>
            </div>
        </div>
    );
}
