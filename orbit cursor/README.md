# DVD Bounce VS Code Extension

A simple VS Code extension that displays a bouncing DVD logo in a WebView panel.

## Features

- Opens a WebView panel with a bouncing DVD logo
- Logo bounces off edges and changes color on impact
- Starts from a random position
- Smooth animation using requestAnimationFrame

## Development

1. Install dependencies:
```bash
npm install
```

2. Compile the extension:
```bash
npm run compile
```

3. Press F5 in VS Code to start debugging
   - This will open a new Extension Development Host window
   - Press Ctrl+Shift+P (Cmd+Shift+P on macOS)
   - Type "Start DVD Bounce" and select the command

## Project Structure

```
.
├── src/
│   └── extension.ts    # Main extension code
├── package.json        # Extension manifest
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## Requirements

- VS Code 1.85.0 or higher
- Node.js and npm installed 