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
		tailwindcss(),
		viteReact(),
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
				failOnError: true,
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
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
	],
});

export default config;
