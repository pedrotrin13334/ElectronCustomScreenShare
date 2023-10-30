// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { contextBridge, ipcRenderer } from "electron";

const api = {
	/*getSelectedSource: async () => {
		const selectedSource = await ipcRenderer.invoke("get-display-media");
		return selectedSource;
	},*/
	ipcRenderer: ipcRenderer,
};

contextBridge.exposeInMainWorld("api", api);

// inject renderer.js into the web page
window.addEventListener("DOMContentLoaded", () => {
	try {
		const rendererScript = document.createElement("script");
		rendererScript.text = `// This file is required by the index.html file and will
	window.api.ipcRenderer.invoke("get-display-media").then((selectedSource)=>{
	console.log(selectedSource)
	// override getDisplayMedia
	navigator.mediaDevices.getDisplayMedia = async () => {
		// create MediaStream
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: "desktop",
					chromeMediaSourceId: selectedSource.id,
					minWidth: 1280,
					maxWidth: 1280,
					minHeight: 720,
					maxHeight: 720,
				},
			},
		});

		return stream;
	};})
  `;
		document.body.appendChild(rendererScript);
	} catch (e) {
		console.log(e);
	}
});
