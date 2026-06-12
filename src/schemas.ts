import { z } from "zod";

export const SessionSchema = z.object({
	username: z.string(),
	id: z.string(),
	token: z.string(),
});

export const TokenResponseSchema = z.object({
	access_token: z.string(),
	expires_in: z.number(),
	scope: z.string().optional(),
	token_type: z.string(),
});

export const LichessAccountSchema = z.object({
	id: z.string(),
	username: z.string(),
});
