import { z } from "zod";

const clientSchema = z.object({
	VITE_API_BASE_URL: z.string("Invalid API Base URL format"),
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
			throw new Error("Invalid environment variables");
		}
		return _env.data;
	} else {
		const _env = clientSchema.safeParse(rawEnv);
		if (!_env.success) {
			console.error("❌ Invalid Client Environment Variables:");
			throw new Error("Invalid environment variables");
		}
		return _env.data as z.infer<typeof fullSchema>;
	}
};

export const env = getEnv();
