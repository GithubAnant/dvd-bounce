import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('bouncing-dvd-logo.showLogo', async () => {
    const panel = vscode.window.createWebviewPanel(
      'bouncingDvdLogo',
      'Bouncing DVD Logo',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
      }
    );

    // Read the HTML file from src/webview.html
    const htmlPath = path.join(context.extensionPath, 'src', 'webview.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Optionally, fix resource URIs if needed (not needed for this minimal example)
    panel.webview.html = html;
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}