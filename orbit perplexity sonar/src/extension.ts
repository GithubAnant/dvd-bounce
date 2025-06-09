import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Bouncing DVD Logo extension activated.');

  context.subscriptions.push(vscode.commands.registerCommand('bouncingDvdLogo.openView', () => {
    const panel = vscode.window.createWebviewPanel('bouncingDvdLogo', 'Bouncing DVD Logo', vscode.ViewColumn.One, {
      enableScripts: true,
      retainContextWhenHidden: true
    });

    let htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bouncing DVD Logo</title>
          <style>
            body {
              margin: 0;
              background-color: #000;
            }
          </style>
        </head>
        <body>
          <div id="logo" style="position: absolute; width: 100px; height: 100px; border-radius: 50%;"></div>
          <script>
            let logo = document.getElementById('logo');
            let x = Math.random() * (window.innerWidth - 100);
            let y = Math.random() * (window.innerHeight - 100);
            let dx = 2 + Math.random() * 2;
            let dy = 2 + Math.random() * 2;
            logo.style.left = \`${x}px\`;
            logo.style.top = \`${y}px\`;
            logo.style.backgroundColor = getRandomColor();

            function animate() {
              requestAnimationFrame(animate);
              x += dx;
              y += dy;

              if (x + 100 > window.innerWidth || x < 0) {
                dx *= -1;
                logo.style.backgroundColor = getRandomColor();
              }
              if (y + 100 > window.innerHeight || y < 0) {
                dy *= -1;
                logo.style.backgroundColor = getRandomColor();
              }

              logo.style.left = \`${x}px\`;
              logo.style.top = \`${y}px\`;
            }

            animate();

            function getRandomColor() {
              var letters = '0123456789ABCDEF';
              var color = '#';
              for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
              }
              return color;
            }
          </script>
        </body>
      </html>
    `;

    panel.webview.html = htmlContent;
  }));
}

export function deactivate() {}