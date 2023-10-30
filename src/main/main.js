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
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	// and load the index.html of the app.
	const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome} Safari/537.36`;
	mainWindow.webContents.setUserAgent(userAgent);
	mainWindow.loadURL("https://www.jitbit.com/screensharing");
	/*mainWindow.loadURL(
		"https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjM5ZDVlODMtYzNlNC00MTc0LTlhYjYtYWQ0ZDNlYzFhYjc0%40thread.v2/0?context=%7b%22Tid%22%3a%22d2629842-54c3-41ec-bab5-2adeebe939c3%22%2c%22Oid%22%3a%22767e9d43-85c8-4394-b57c-8e7e5d10cb6b%22%7d",
	);*/
	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	ipcMain.handle("get-display-media", async () => {
		const sources = await desktopCapturer.getSources({
			types: ["window", "screen"],
		});

		// you should create some kind of UI to prompt the user
		// to select the correct source like Google Chrome does
		const selectedSource = sources[0]; // this is just for testing purposes

		console.log("Selected Sources: ", selectedSource);
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
