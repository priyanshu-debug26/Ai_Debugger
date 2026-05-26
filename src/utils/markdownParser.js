export function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function parseMarkdown(text) {
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
                    <button class="copy-btn" onclick="window.copyCode(this)">Copy</button>
                </div>
                <pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>
            </div>`;
        }
    }

    return html;
}

if (typeof window !== 'undefined') {
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
}
