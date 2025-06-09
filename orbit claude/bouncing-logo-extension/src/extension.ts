import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let currentPanel: vscode.WebviewPanel | undefined = undefined;

    const disposable = vscode.commands.registerCommand('bouncingLogo.show', () => {
        if (currentPanel) {
            currentPanel.reveal(vscode.ViewColumn.One);
            return;
        }

        currentPanel = vscode.window.createWebviewPanel(
            'bouncingLogo',
            'Bouncing DVD Logo',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        currentPanel.webview.html = getWebviewContent();

        currentPanel.onDidDispose(() => {
            currentPanel = undefined;
        }, null, context.subscriptions);
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bouncing DVD Logo</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #000;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
        }
        
        .logo {
            position: absolute;
            font-family: Arial, sans-serif;
            font-size: 32px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            user-select: none;
            pointer-events: none;
            transition: color 0.1s ease;
        }
    </style>
</head>
<body>
    <div class="logo" id="logo">DVD</div>

    <script>
        class BouncingLogo {
            constructor() {
                this.logo = document.getElementById('logo');
                this.colors = [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
                    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd',
                    '#00d2d3', '#ff9f43', '#ee5a52', '#0abde3',
                    '#10ac84', '#f368e0', '#3742fa', '#2f3542'
                ];
                
                this.init();
                this.animate();
            }

            init() {
                // Get container dimensions
                this.containerWidth = window.innerWidth;
                this.containerHeight = window.innerHeight;
                
                // Get logo dimensions
                const rect = this.logo.getBoundingClientRect();
                this.logoWidth = rect.width;
                this.logoHeight = rect.height;
                
                // Random starting position
                this.x = Math.random() * (this.containerWidth - this.logoWidth);
                this.y = Math.random() * (this.containerHeight - this.logoHeight);
                
                // Random initial velocity
                this.vx = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3);
                this.vy = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3);
                
                // Set initial color
                this.changeColor();
                
                // Set initial position
                this.updatePosition();
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    this.containerWidth = window.innerWidth;
                    this.containerHeight = window.innerHeight;
                    
                    // Adjust position if logo is now outside bounds
                    this.x = Math.min(this.x, this.containerWidth - this.logoWidth);
                    this.y = Math.min(this.y, this.containerHeight - this.logoHeight);
                });
            }

            changeColor() {
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                this.logo.style.color = color;
            }

            updatePosition() {
                this.logo.style.left = this.x + 'px';
                this.logo.style.top = this.y + 'px';
            }

            animate() {
                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Check for collisions and bounce
                let bounced = false;
                
                if (this.x <= 0 || this.x >= this.containerWidth - this.logoWidth) {
                    this.vx = -this.vx;
                    this.x = Math.max(0, Math.min(this.x, this.containerWidth - this.logoWidth));
                    bounced = true;
                }

                if (this.y <= 0 || this.y >= this.containerHeight - this.logoHeight) {
                    this.vy = -this.vy;
                    this.y = Math.max(0, Math.min(this.y, this.containerHeight - this.logoHeight));
                    bounced = true;
                }

                // Change color on bounce
                if (bounced) {
                    this.changeColor();
                }

                this.updatePosition();

                // Continue animation
                requestAnimationFrame(() => this.animate());
            }
        }

        // Start the animation when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new BouncingLogo();
        });

        // Also start immediately if DOM is already loaded
        if (document.readyState === 'loading') {
            // DOM is still loading
        } else {
            new BouncingLogo();
        }
    </script>
</body>
</html>`;
}

export function deactivate() {}