import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { HOST_URL } from "#/config.ts";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
			},
			pages: [
				{
					path: "/callback",
					prerender: {
						enabled: false,
					},
					sitemap: {
						exclude: true,
					},
				},
			],
			sitemap: {
				enabled: true,
				host: HOST_URL,
			},
		}),
		viteReact(),
	],
});

export default config;
