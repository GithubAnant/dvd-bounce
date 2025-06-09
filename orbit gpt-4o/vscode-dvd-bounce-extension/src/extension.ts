import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.startDvdBounce', () => {
      const panel = vscode.window.createWebviewPanel(
        'dvdBounce',
        'DVD Bounce',
        vscode.ViewColumn.One,
        {
          enableScripts: true
        }
      );

      const htmlPath = path.join(context.extensionPath, 'media', 'dvd.html');
      panel.webview.html = fs.readFileSync(htmlPath, 'utf8');
    })
  );
}

export function deactivate() {}