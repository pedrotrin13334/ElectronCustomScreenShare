import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow;

function createWindow() {
	const dirpath = path.join(__dirname, "..", "preload", "preload.js");
	mainWindow = new BrowserWindow({
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
			preload: dirpath, // Path to your preload script
		},
	});

	console.log(dirpath);
	//mainWindow.loadURL("http://localhost:5173");
	mainWindow.loadURL("https://www.jitbit.com/screensharing");
	mainWindow.on("closed", () => (mainWindow = null));
}

/* async function CustomDisplayMedia(...args) {
	const newWindow = new BrowserWindow({
		WebPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
		},
	});

	// Vite dev server URL
	newWindow.loadURL("http://localhost:5173");
	newWindow.show();
} */

app.whenReady().then(() => {
	createWindow();
});
