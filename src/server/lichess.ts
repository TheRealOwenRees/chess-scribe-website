import { randomBytes } from "node:crypto";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
	deleteCookie,
	getCookie,
	setCookie,
} from "@tanstack/react-start/server";
import { env } from "#/env.ts";
import { base64UrlEncode, sha256 } from "#/lib/encodeDecode.ts";

const createVerifier = () => base64UrlEncode(randomBytes(32));
const createChallenge = (verifier: string) => base64UrlEncode(sha256(verifier));

const getRedirectUri = () =>
	process.env.NODE_ENV === "production"
		? `https://${env.LICHESS_CLIENT_ID}/callback`
		: "http://localhost:3000/callback";

export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = getCookie("lichess-session");
		if (!session) return null;
		try {
			return JSON.parse(session) as {
				username: string;
				id: string;
				token: string;
			};
		} catch {
			return null;
		}
	},
);

export const setSession = createServerFn({ method: "POST" })
	.inputValidator(
		(data: { username: string; id: string; token: string }) => data,
	)
	.handler(async ({ data }) => {
		setCookie(
			"lichess-session",
			JSON.stringify({
				username: data.username,
				id: data.id,
				token: data.token,
			}),
			{
				path: "/",
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 60 * 60 * 24 * 7,
			},
		);

		setCookie("lichess-oauth-verifier", "", {
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 0,
		});

		return { username: data.username, id: data.id };
	});

export const getToken = createServerFn({ method: "POST" })
	.inputValidator((data: { code: string }) => data)
	.handler(async ({ data }) => {
		const verifier = getCookie("lichess-oauth-verifier");

		if (!verifier)
			throw new Error("OAuth session expired. Please login again.");

		const response = await fetch("https://lichess.org/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				grant_type: "authorization_code",
				client_id: env.LICHESS_CLIENT_ID || "",
				code: data.code,
				redirect_uri: getRedirectUri(),
				code_verifier: verifier,
			}),
		});

		if (!response.ok)
			throw new Error(`Token exchange failed: ${await response.text()}`);

		return response.json();
	});

export const getUser = createServerFn({ method: "GET" })
	.inputValidator((data: { access_token: string }) => data)
	.handler(async ({ data }) => {
		const response = await fetch("https://lichess.org/api/account", {
			headers: {
				Authorization: `Bearer ${data.access_token}`,
			},
		});

		return response.json();
	});

const deleteAccessToken = createServerFn().handler(async () => {
	const session = await getSession();
	const token = session?.token;

	if (token) {
		const response = await fetch("https://lichess.org/api/token", {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return await response.json();
	}
});

export const logout = createServerFn().handler(async () => {
	await deleteAccessToken();
	deleteCookie("lichess-session", { path: "/" });
	deleteCookie("lichess-oauth-verifier", { path: "/" }); // cookie shouldn't exist
});

export const login = createServerFn({ method: "GET" }).handler(async () => {
	const verifier = createVerifier();
	const challenge = createChallenge(verifier);

	setCookie("lichess-oauth-verifier", verifier, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 10,
	});

	const params = new URLSearchParams({
		response_type: "code",
		client_id: env.LICHESS_CLIENT_ID || "",
		redirect_uri: getRedirectUri(),
		scope: "study:read",
		code_challenge_method: "S256",
		code_challenge: challenge,
	});

	throw redirect({
		href: `https://lichess.org/oauth?${params.toString()}`,
	});
});

export const getUserStudies = createServerFn({ method: "POST" }).handler(
	async () => {
		const session = await getSession();

		if (!session) return;

		const response = await fetch(
			`https://lichess.org/api/study/by/${session.username}`,
			{
				headers: {
					Authorization: `Bearer ${session.token}`,
				},
			},
		);

		const studies = await response.text();

		return studies
			.trim()
			.split("\n")
			.map((study) => JSON.parse(study));
	},
);

export const getStudyChapters = createServerFn({ method: "POST" })
	.inputValidator((data: { studyId: string }) => data)
	.handler(async ({ data }) => {
		const session = await getSession();

		if (!session) return;

		const response = await fetch(
			`https://lichess.org/api/study/${data.studyId}.pgn`,
			{
				headers: {
					Authorization: `Bearer ${session.token}`,
				},
			},
		);

		const text = await response.text();

		return text
			.trim()
			.split(/\n{3,}/)
			.map((game) => {
				const eventHeaderText = game.match(/\[Event\s+"([^"]+)"]/)?.[1];
				const eventName = eventHeaderText?.match(/(?<=:\s+)[^"]+/)?.[0] || "";
				const siteHeaderText = game.match(/\[Site\s+"([^"]+)"]/)?.[1];
				const chapterId = siteHeaderText?.match(/\/([^/]+)$/)?.[1] || "";
				return { chapterId, pgn: game, name: eventName };
			});
	});
