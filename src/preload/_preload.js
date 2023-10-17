import { desktopCapturer } from "electron";

/* contextBridge.exposeInMainWorld("myCustomGetDisplayMedia", async () => {
	const sources = await desktopCapturer.getSources({
		types: ["window", "screen"],
	});

	// you should create some kind of UI to prompt the user
	// to select the correct source like Google Chrome does
	const selectedSource = sources[0]; // this is just for testing purposes

	return selectedSource;
}); */

navigator.mediaDevices.getDisplayMedia = async (...args) => {
	try {
		console.log(args);
		//const selectedSource = await globalThis.myCustomGetDisplayMedia();
		//return await streamInterface(selectedSource.id);
		return Promise.resolve();
	} catch (e) {
		console.log(e);
	}
};

window.isWorking = true;

async function streamInterface(sourceId) {
	console.log(sourceId);
	const stream = await navigator.mediaDevices.getUserMedia({
		audio: false,
		video: {
			mandatory: {
				chromeMediaSource: "desktop",
				chromeMediaSourceId: sourceId,
				minWidth: 1280,
				maxWidth: 1280,
				minHeight: 720,
				maxHeight: 720,
			},
		},
	});

	return stream;
}

/* async function assignSelectSourceHandler() {
	const actionValues = ["monitor", "window", "none"];
	const action = await dialog.showMessageBox(window, {
		type: "question",
		buttons: ["Monitor", "Window", "Cancel"],
		title: "Type of source",
		normalizeAccessKeys: true,
		defaultId: 0,
		cancelId: 2,
		message: "Please choose the type of source (Monitor/Window)",
	});
	return actionValues[action.response];
}
 */
