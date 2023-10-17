import { desktopCapturer } from "electron";

let _getDisplayMedia;

_getDisplayMedia = navigator.mediaDevices.getDisplayMedia;
navigator.mediaDevices.getDisplayMedia = CallCustomDisplayMedia;

async function CallCustomDisplayMedia(...args) {
	console.log(args);
	console.log(_getDisplayMedia);

	const sources = await desktopCapturer.getSources({
		types: ["window", "screen"],
	});

	const selectedSource = sources[0];

	//return await streamInterface(selectedSource.id);
	return Promise.resolve();
}

window.isWorking = true;

async function streamInterface(sourceId) {
	console.log("TESTE");
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
