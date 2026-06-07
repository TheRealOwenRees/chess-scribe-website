import { randomBytes } from "node:crypto";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { env } from "#/env.ts";
import { base64UrlEncode, sha256 } from "#/lib/encodeDecode.ts";

export const getToken = createServerFn({ method: "POST" }).handler(async () => {
	console.log("getTokens");
});

export const login = createServerFn({ method: "POST" }).handler(async () => {
	const createVerifier = () => base64UrlEncode(randomBytes(32));
	const createChallenge = (verifier: string) =>
		base64UrlEncode(sha256(verifier));

	const verifier = createVerifier();
	const challenge = createChallenge(verifier);

	const params = new URLSearchParams({
		response_type: "code",
		client_id: env.LICHESS_CLIENT_ID || "",
		redirect_uri: `${process.env.NODE_ENV === "production" ? `https://${env.LICHESS_CLIENT_ID}/callback` : "http://localhost:3000/callback"}`,
		scope: "study:read",
		code_challenge_method: "S256",
		code_challenge: challenge,
	});

	throw redirect({
		href: `https://lichess.org/oauth?${params.toString()}`,
		statusCode: 302,
		headers: {
			"Set-Cookie": `lichess_oauth_verifier=${verifier}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`, // Expires in 10 mins
		},
	});
});
