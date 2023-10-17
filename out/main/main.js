"use strict";
const electron = require("electron");
const path = require("path");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "..", "preload", "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadURL("https://www.jitbit.com/screensharing");
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.ipcMain.handle("get-display-media", async () => {
    console.log("Cheguei Aqui");
    const sources = await electron.desktopCapturer.getSources({
      types: ["window", "screen"]
    });
    const selectedSource = sources[0];
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
