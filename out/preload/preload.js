"use strict";
const electron = require("electron");
let _getDisplayMedia;
_getDisplayMedia = navigator.mediaDevices.getDisplayMedia;
navigator.mediaDevices.getDisplayMedia = CallCustomDisplayMedia;
async function CallCustomDisplayMedia(...args) {
  console.log(args);
  console.log(_getDisplayMedia);
  const sources = await electron.desktopCapturer.getSources({
    types: ["window"]
  });
  sources[0];
  return Promise.resolve();
}
window.isWorking = true;
