import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('dvd-bounce.start', () => {
        const panel = vscode.window.createWebviewPanel(
            'dvdBounce',
            'DVD Bounce',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        const webviewPath = path.join(context.extensionPath, 'src', 'webview', 'dvd.html');
        panel.webview.html = getWebviewContent(webviewPath);
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(webviewPath: string): string {
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    overflow: hidden;
                    background: #1e1e1e;
                }
                #dvd {
                    position: absolute;
                    font-family: Arial, sans-serif;
                    font-size: 24px;
                    font-weight: bold;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                }
            </style>
        </head>
        <body>
            <div id="dvd">DVD</div>
            <script>
                const dvd = document.getElementById('dvd');
                let x = Math.random() * (window.innerWidth - dvd.offsetWidth);
                let y = Math.random() * (window.innerHeight - dvd.offsetHeight);
                let dx = 2;
                let dy = 2;

                function getRandomColor() {
                    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
                    return colors[Math.floor(Math.random() * colors.length)];
                }

                function animate() {
                    x += dx;
                    y += dy;

                    if (x <= 0 || x + dvd.offsetWidth >= window.innerWidth) {
                        dx = -dx;
                        dvd.style.color = getRandomColor();
                    }
                    if (y <= 0 || y + dvd.offsetHeight >= window.innerHeight) {
                        dy = -dy;
                        dvd.style.color = getRandomColor();
                    }

                    dvd.style.left = x + 'px';
                    dvd.style.top = y + 'px';
                    requestAnimationFrame(animate);
                }

                animate();
            </script>
        </body>
    </html>`;
}

export function deactivate() {} 