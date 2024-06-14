
document.addEventListener('DOMContentLoaded', function () {
	const appContainer = document.querySelector("#app");

	const progressElement = document.querySelector("#progress");

	const canvasContainerElement = document.querySelector("#canvas-container");

	const soundOnIcon = document.querySelector("#sound-on");

	const soundOffIcon = document.querySelector("#sound-off");


	let gainNode, audioCtx;


	function enterFullscreen() {
		(canvasContainerElement.requestFullscreen || canvasContainerElement.webkitRequestFullscreen || function () { alert("Fullscreen is not supported on iOS") }).call(canvasContainerElement)
	}

	function onExitFullscreen() {
		document.fullscreen, doResize()
	}

	function onResize() {
		setTimeout(doResize, 100)
	}

	function doResize() {
		appContainer.style.height = `${window.innerHeight}px`,
			Options.setFramebufferSize(canvasContainerElement.clientWidth * devicePixelRatio, canvasContainerElement.clientHeight * devicePixelRatio)
	}

	function onAudioInit() {
		audioCtx = Options.getCurrentAudioContext();

		const e = Options.getCurrentAudioSource();

		"suspended" == audioCtx.state ? showSoundOffIcon() : showSoundOnIcon(), gainNode = audioCtx.createGain(), e.disconnect(audioCtx.destination), e.connect(gainNode), gainNode.connect(audioCtx.destination), audioCtx.addEventListener("statechange", updateAudioStatus)
	}

	function updateAudioStatus() {
		"running" != audioCtx.state || 0 == gainNode.gain.value ? showSoundOffIcon() : showSoundOnIcon()
	}
	async function toggleAudioContext() {
		"running" == audioCtx.state && (1 == gainNode.gain.value ? gainNode.gain.value = 0 : gainNode.gain.value = 1, updateAudioStatus())
	}

	function showSoundOnIcon() {
		soundOnIcon.style.display = "inline", soundOffIcon.style.display = "none"
	}
	function showSoundOffIcon() {
		soundOnIcon.style.display = "none", soundOffIcon.style.display = "inline"
	}

	let hasRaiseRuntimeError = !1;
	function onRuntimeError() {
		progressElement.classList.add("progress-error"), progressElement.style.width = "100%", progressElement.hidden = !1, hasRaiseRuntimeError = !0
	}
	const Options = {
		preRun: [],
		postRun: [doResize, onAudioInit],
		onAbort: function (e) { onRuntimeError() },
		onAlert: function (e) { document.querySelector(".error-text").textContent = e }, canvas: function () {
			var e = document.getElementById("canvas");
			return e.addEventListener("webglcontextlost", (function (e) { alert("WebGL context lost. You will need to reload the page."), onRuntimeError(), e.preventDefault() }), !1), e
		}(),
		setStatus: function (e) {
			if (Options.setStatus.last || (Options.setStatus.last = { time: Date.now(), text: "" }), e !== Options.setStatus.last.text) {
				var n = e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/), t = Date.now();
				n && t - Options.setStatus.last.time < 30 || (Options.setStatus.last.time = t, Options.setStatus.last.text = e, n ? (e = n[1], progressElement.style.width = 100 * parseInt(n[2]) / parseInt(n[4]) + "%", progressElement.hidden = !1) : hasRaiseRuntimeError || (progressElement.hidden = !0))
			}
		},
		totalDependencies: 0,
		monitorRunDependencies: function (e) {
			this.totalDependencies = Math.max(this.totalDependencies, e), Options.setStatus(e ? "Preparing... (" + (this.totalDependencies - e) + "/" + this.totalDependencies + ")" : "All downloads complete.")
		},
		onRuntimeInitialized: function () { window.addEventListener("resize", onResize), window.addEventListener("fullscreenchange", onExitFullscreen) },
		onRuntimeExit: function () {
			document.querySelector(".playground-overlay").hidden = !1;
			var e = document.querySelector(".reload-button");
			e.hidden = !1, document.querySelector(".play-button").hidden = !0, e.addEventListener("click", (function () { location.reload() }))
		}
	};

	Options.setStatus("Downloading...")

	if (window != window.parent) {
		var overlay = document.querySelector(".playground-overlay");
		overlay.hidden = !1, overlay.addEventListener("click", (function e() { overlay.removeEventListener("click", e), overlay.hidden = !0, Options.canvas.hidden = !1, Module(Options) }))
	}
	else {
		document.querySelector("script[async]").addEventListener("load", (function () { Options.canvas.hidden = !1, Module(Options) }))
	}

	document.getElementById('canvas').addEventListener('contextmenu', ev=>ev.preventDefault());

	document.getElementById('js-toggle-sound').addEventListener('click', ()=>toggleAudioContext());
	document.getElementById('js-enter-fullscreen').addEventListener('click', ()=>enterFullscreen());
});