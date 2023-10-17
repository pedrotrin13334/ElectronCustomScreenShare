"use strict";
const electron = require("electron");
const path = require("path");
let mainWindow;
function createWindow() {
  const dirpath = path.join(__dirname, "..", "preload", "preload.js");
  mainWindow = new electron.BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: dirpath
      // Path to your preload script
    }
  });
  console.log(dirpath);
  mainWindow.loadURL("https://www.jitbit.com/screensharing");
  mainWindow.on("closed", () => mainWindow = null);
}
electron.app.whenReady().then(() => {
  createWindow();
});
