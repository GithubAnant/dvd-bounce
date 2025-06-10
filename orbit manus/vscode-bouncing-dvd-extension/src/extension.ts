import * as vscode from 'vscode';

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

export function deactivate() {}

