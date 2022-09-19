import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	adapter: adapter(),
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
}

export default config;