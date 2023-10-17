// Modules to control application life and create native browser window

import { BrowserWindow, app, desktopCapturer, ipcMain } from "electron";
import path from "path";

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "..", "preload", "preload.js"),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	// and load the index.html of the app.
	//mainWindow.loadURL("https://google.com"); // you can load any website here
	mainWindow.loadURL("https://www.jitbit.com/screensharing");
	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	ipcMain.handle("get-display-media", async () => {
		console.log("Cheguei Aqui");
		const sources = await desktopCapturer.getSources({
			types: ["window", "screen"],
		});

		// you should create some kind of UI to prompt the user
		// to select the correct source like Google Chrome does
		const selectedSource = sources[0]; // this is just for testing purposes

		return selectedSource;
	});

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
