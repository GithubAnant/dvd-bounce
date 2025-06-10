## VS Code Bouncing DVD Logo Extension

This document explains the structure, initialization, and testing of the Bouncing DVD Logo VS Code extension.

### 1. File Structure

The extension's files are organized as follows:

```
vscode-bouncing-dvd-extension/
├── package.json
├── src/
│   └── extension.ts
├── out/ (generated after compilation)
│   └── extension.js
└── todo.md
```

*   `vscode-bouncing-dvd-extension/`: The root directory of your extension.
*   `package.json`: This file defines the extension's metadata, activation events, commands, and dependencies. It's crucial for VS Code to recognize and load your extension.
*   `src/`: This directory contains the TypeScript source code for your extension.
*   `src/extension.ts`: This is the main entry point of your extension. It contains the `activate` and `deactivate` functions, which are called when your extension is activated and deactivated, respectively. In this extension, it handles the creation of the WebView panel and injects the HTML/JavaScript for the bouncing logo.
*   `out/`: This directory is created after you compile your TypeScript code. It contains the compiled JavaScript files that VS Code actually runs.

### 2. How to Structure and Initialize the Extension

1.  **Project Setup**: The `vscode-bouncing-dvd-extension` directory serves as the root of your extension project. All extension-related files reside within this directory.
2.  **`package.json`**: This file is automatically read by VS Code. The `activationEvents` field specifies when your extension should be activated (in this case, when the `bouncing-dvd-logo.start` command is executed). The `main` field points to the compiled JavaScript entry file (`./out/extension.js`). The `contributes.commands` section registers the command that users can execute.
3.  **`extension.ts`**: The `activate` function in `extension.ts` is where your extension's main logic resides. When the `bouncing-dvd-logo.start` command is triggered, it creates a `WebviewPanel`. The `enableScripts: true` option is essential to allow the JavaScript code within the WebView to run. The `getWebviewContent()` function provides the HTML and JavaScript for the WebView. This HTML includes the CSS for styling the logo and the JavaScript for handling its movement, bouncing, and color changes.

### 3. How to Test the Extension Locally

To test this extension locally, follow these steps:

1.  **Navigate to the Extension Directory**: Open your terminal or command prompt and navigate to the `vscode-bouncing-dvd-extension` directory:
    ```bash
    cd vscode-bouncing-dvd-extension
    ```

2.  **Install Dependencies**: Install the necessary Node.js dependencies:
    ```bash
    npm install
    ```

3.  **Compile TypeScript**: Compile the TypeScript code to JavaScript:
    ```bash
    npm run compile
    ```

4.  **Open in VS Code**: Open this directory in VS Code:
    ```bash
    code .
    ```

5.  **Run the Extension**: In VS Code, press `F5` to open a new Extension Development Host window. This new window will have your extension loaded.

6.  **Activate the Command**: In the Extension Development Host window, open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and type `Start Bouncing DVD Logo`. Select the command to execute it.

7.  **View the Bouncing Logo**: A new WebView panel will open, displaying the bouncing DVD-style logo. The logo will move continuously, bounce off the edges, and change color on each bounce.


