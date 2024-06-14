import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";

interface Data {
	name: string;
	id: string;
	favicon: string;
	github: string;
	keywords: string[];
};

export default function Home(props: PageProps) {
	const data: Data = JSON.parse(Deno.readTextFileSync(`./static/games/${props.params.name}/info.json`));

	return (
		<>
			<Head>
        		<meta name="keywords" content={data.keywords.join(',')} />
				<title>{data.name}</title>
        		<meta property="og:title" content={data.name} />
				
        		<meta name="description" content={`${data.name}は、OpenSiv3D for Webで制作されたゲームです。`} />
        		<meta property="og:description" content={`${data.name}は、OpenSiv3D for Webで制作されたゲームです。`} />
        		<meta property="og:url" content={import.meta.url} />
        		<meta property="og:image" content={data.favicon} />
        		<meta name="twitter:card" content="summary" />
				
				<link rel="apple-touch-icon" type="image/png" href={data.favicon} />
        		<link rel="icon" type="image/png" href={data.favicon} />

				<link rel="stylesheet" href="/styles/css/game.css" />

				<script src={`/games/${props.params.name}/${props.params.name}_Web.js`} async></script>
				<script src="/scripts/game.js"></script>
			</Head>
			<div id="app">
				<div class="playground-overlay" hidden>
					<span class="button-container">
						<div class="play-button">
							<svg
								id="_x32_"
								style="enable-background:new 0 0 512 512"
								version="1.1"
								viewBox="0 0 512 512"
								x="0px"
								y="0px"
								xml:space="preserve"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<g>
									<path class="st1" d="
			M256,0C114.625,0,0,114.625,0,256c0,141.374,114.625,256,256,256c141.374,0,256-114.626,256-256
			C512,114.625,397.374,0,256,0z M351.062,258.898l-144,85.945c-1.031,0.626-2.344,0.657-3.406,0.031
			c-1.031-0.594-1.687-1.702-1.687-2.937v-85.946v-85.946c0-1.218,0.656-2.343,1.687-2.938c1.062-0.609,2.375-0.578,3.406,0.031
			l144,85.962c1.031,0.586,1.641,1.718,1.641,2.89C352.703,257.187,352.094,258.297,351.062,258.898z"
									/>
								</g>
							</svg>
						</div>

						<div class="reload-button" hidden>
							<svg
								id="_x32_"
								style="enable-background:new 0 0 512 512"
								version="1.1"
								viewBox="0 0 512 512"
								x="0px"
								y="0px"
								xml:space="preserve"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<g>
									<path class="st1" d="
			M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9
			l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6
			c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6
			C49.575,418.961,150.875,501.261,268.175,488.161z"
									/>
								</g>
							</svg>
						</div>

						<div class="error-text">

						</div>
					</span>
				</div>
				<div id="progress-frame">
					<div id="progress" class="progress-ok" hidden></div>
				</div>
				<div id="app-container">
					<div id="canvas-container">
						<canvas class="emscripten" hidden id="canvas" tabindex={-1}></canvas>
					</div>
					<div id="footer-control">
						<a id="js-toggle-sound" class="footer-button st0" href="javascript:void(0);">
							<svg
								id="sound-off"
								style="enable-background:new 0 0 512 512"
								version="1.1"
								viewBox="0 0 512 512"
								x="0px"
								y="0px"
								xml:space="preserve"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<g class="st0">
									<path d="M0,204.883V307.12c0,21.22,17.212,38.437,38.442,38.437h71.582V166.446H38.442 C17.212,166.446,0,183.653,0,204.883z" />
									<path d="
			M288.033,94.716c-3.872-2.382-8.696-2.568-12.744-0.517l-142.237,72.246v179.112l142.237,72.246
			c4.048,2.051,8.872,1.856,12.744-0.517c3.872-2.373,6.226-6.582,6.226-11.123V105.839
			C294.259,101.298,291.905,97.089,288.033,94.716z"
									/>
									<path d="
			M453.117,253.467l54.386-54.394c5.996-5.996,5.996-15.713,0-21.709c-5.996-5.996-15.713-5.996-21.709,0
			l-54.386,54.385l-54.394-54.385c-5.997-5.996-15.713-5.996-21.709,0c-5.997,5.996-5.997,15.713,0,21.709l54.384,54.394
			l-54.384,54.385c-5.997,5.996-5.997,15.713,0,21.709c5.996,5.996,15.712,5.996,21.709,0l54.394-54.386l54.386,54.386
			c5.996,5.996,15.713,5.996,21.709,0c5.996-5.996,5.996-15.713,0-21.709L453.117,253.467z"
									/>
								</g>
							</svg>
							<svg
								id="sound-on"
								style="enable-background:new 0 0 512 512;display:none"
								version="1.1"
								viewBox="0 0 512 512"
								x="0px"
								y="0px"
								xml:space="preserve"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<g>
									<path d="M0,206.254v99.491c0,20.663,16.752,37.418,37.414,37.418h69.667V168.844H37.414 C16.752,168.844,0,185.591,0,206.254z" />
									<path d="
			M280.326,99.026c-3.768-2.31-8.464-2.5-12.403-0.494l-138.431,70.313v174.319l138.431,70.313
			c3.94,1.996,8.635,1.806,12.403-0.503c3.764-2.31,6.059-6.416,6.059-10.826V109.86C286.386,105.441,284.09,101.335,280.326,99.026z"
									/>
									<path d="
			M408.522,162.666c-5.066-5.626-13.725-6.073-19.346-1.007c-5.618,5.057-6.068,13.715-1.007,19.341
			c19.15,21.252,28.713,48.074,28.718,75c-0.005,26.936-9.567,53.756-28.713,74.998c-5.066,5.618-4.615,14.285,1.002,19.351
			c5.617,5.056,14.28,4.61,19.341-1.007c23.842-26.451,35.775-59.944,35.765-93.342C444.291,222.61,432.358,189.107,408.522,162.666z"
									/>
									<path d="
			M458.88,117.33c-5.061-5.617-13.72-6.064-19.342-0.998c-5.622,5.056-6.073,13.715-1.007,19.341
			c30.722,34.092,46.068,77.156,46.077,120.326c-0.01,43.168-15.355,86.232-46.077,120.334c-5.066,5.618-4.614,14.276,1.007,19.342
			c5.622,5.066,14.28,4.62,19.346-1.008C494.289,355.367,512.01,305.631,512,256C512.01,206.368,494.289,156.631,458.88,117.33z"
									/>
									<path d="
			M338.764,207.032c-5.622,5.057-6.073,13.725-1.007,19.342c7.594,8.43,11.362,18.98,11.371,29.626
			c-0.009,10.644-3.777,21.194-11.371,29.634c-5.066,5.618-4.614,14.276,1.007,19.341c5.622,5.066,14.28,4.609,19.341-1.007
			c12.261-13.601,18.43-30.832,18.415-47.968c0.015-17.137-6.154-34.359-18.415-47.96
			C353.044,202.414,344.382,201.967,338.764,207.032z"
									/>
								</g>
							</svg>
						</a>
						<a id="js-enter-fullscreen" class="footer-button" href="javascript:void(0);">
							<svg height="1cm" version="1.1" viewBox="0 0 100 100" width="1cm" xmlns="http://www.w3.org/2000/svg">
								<rect fill="none" height="60" stroke="white" stroke-width="5" width="80" x="10" y="20" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
