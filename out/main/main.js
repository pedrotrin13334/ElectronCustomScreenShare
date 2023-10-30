"use strict";
const electron = require("electron");
const path = require("path");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "..", "preload", "preload.js"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome} Safari/537.36`;
  mainWindow.webContents.setUserAgent(userAgent);
  mainWindow.loadURL("https://www.jitbit.com/screensharing");
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.ipcMain.handle("get-display-media", async () => {
    const sources = await electron.desktopCapturer.getSources({
      types: ["window", "screen"]
    });
    const selectedSource = sources[0];
    console.log("Selected Sources: ", selectedSource);
    return selectedSource;
  });
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", function() {
  if (process.platform !== "darwin")
    electron.app.quit();
});
