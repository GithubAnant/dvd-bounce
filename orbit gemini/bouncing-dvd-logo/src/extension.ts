import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('bouncing-dvd-logo.start', () => {
        const panel = vscode.window.createWebviewPanel(
            'bouncingDvdLogo',
            'Bouncing DVD Logo',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        const webviewPath = path.join(context.extensionPath, 'webview', 'index.html');
        panel.webview.html = fs.readFileSync(webviewPath, 'utf8');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}