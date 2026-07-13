import { z } from "zod";

const clientSchema = z.object({
	VITE_API_BASE_URL: z.url("Invalid API Base URL format"),
	VITE_MATOMO_URL: z.url("Invalid URL format"),
	VITE_MATOMO_SITE_ID: z.string("Invalid Site ID"),
	VITE_MAINTENANCE_MODE: z.string("Invalid Maintenance Mode"),
	VITE_MAINTENANCE_MODE_MESSAGE: z.string().optional(),
});

const serverSchema = z.object({
	DISCORD_CONTACT_WEBHOOK: z.string("Invalid Discord Contact Webhook URL"),
	DISCORD_ERROR_LOG_WEBHOOK: z.string("Invalid Discord Error Log Webhook URL"),
	LICHESS_CLIENT_ID: z.string("Invalid Lichess Client ID"),
});

const fullSchema = z.object({
	...clientSchema.shape,
	...serverSchema.shape,
});

const isServer = typeof window === "undefined";
const rawEnv = isServer ? process.env : import.meta.env;

const getEnv = () => {
	if (isServer) {
		const _env = fullSchema.safeParse(rawEnv);
		if (!_env.success) {
			console.error("❌ Invalid Server Environment Variables:");
			console.error(JSON.stringify(_env.error.format(), null, 2));
			throw new Error("Invalid environment variables");
		}
		return _env.data;
	} else {
		const _env = clientSchema.safeParse(rawEnv);
		if (!_env.success) {
			console.error("❌ Invalid Client Environment Variables:");
			console.error(JSON.stringify(_env.error.format(), null, 2));
			throw new Error("Invalid environment variables");
		}
		return _env.data as z.infer<typeof fullSchema>;
	}
};

export const env = getEnv();
