"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.commands.registerCommand('bouncing-dvd-logo.start', () => {
        const panel = vscode.window.createWebviewPanel('bouncingDvdLogo', 'Bouncing DVD Logo', vscode.ViewColumn.One, {
            enableScripts: true
        });
        panel.webview.html = getWebviewContent();
    });
    context.subscriptions.push(disposable);
}
function getWebviewContent() {
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Bouncing DVD Logo</title>
		<style>
			body {
				margin: 0;
				overflow: hidden;
				background-color: #222;
			}
			.logo {
				position: absolute;
				width: 100px;
				height: 50px;
				background-color: red; /* Initial color */
				display: flex;
				justify-content: center;
				align-items: center;
				font-family: sans-serif;
				color: white;
				font-weight: bold;
				font-size: 24px;
			}
		</style>
	</head>
	<body>
		<div class="logo">DVD</div>

		<script>
			const logo = document.querySelector('.logo');
			let x = Math.random() * (window.innerWidth - logo.offsetWidth);
			let y = Math.random() * (window.innerHeight - logo.offsetHeight);
			let dx = 2; // x direction speed
			let dy = 2; // y direction speed

			function getRandomColor() {
				const letters = '0123456789ABCDEF';
				let color = '#';
				for (let i = 0; i < 6; i++) {
					color += letters[Math.floor(Math.random() * 16)];
				}
				return color;
			}

			function animate() {
				x += dx;
				y += dy;

				if (x + logo.offsetWidth > window.innerWidth || x < 0) {
					dx *= -1;
					logo.style.backgroundColor = getRandomColor();
				}
				if (y + logo.offsetHeight > window.innerHeight || y < 0) {
					dy *= -1;
					logo.style.backgroundColor = getRandomColor();
				}

				logo.style.left = x + 'px';
				logo.style.top = y + 'px';

				requestAnimationFrame(animate);
			}

			animate();
		</script>
	</body>
	</html>`;
}
function deactivate() { }
//# sourceMappingURL=extension.js.map