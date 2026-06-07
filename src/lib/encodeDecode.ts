import { createHash } from "node:crypto";

export const base64UrlEncode = (str: Buffer) => {
	return str
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=/g, "");
};

export const sha256 = (buffer: string) =>
	createHash("sha256").update(buffer).digest();
