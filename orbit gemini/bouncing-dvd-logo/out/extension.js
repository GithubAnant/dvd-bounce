"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function activate(context) {
    let disposable = vscode.commands.registerCommand('bouncing-dvd-logo.start', () => {
        const panel = vscode.window.createWebviewPanel('bouncingDvdLogo', 'Bouncing DVD Logo', vscode.ViewColumn.One, {
            enableScripts: true
        });
        const webviewPath = path.join(context.extensionPath, 'webview', 'index.html');
        panel.webview.html = fs.readFileSync(webviewPath, 'utf8');
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map