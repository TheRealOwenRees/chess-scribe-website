import { createServerFn } from "@tanstack/react-start";
import { env } from "#/env.ts";

export const sendToDiscord = createServerFn({ method: "POST" })
	.inputValidator(
		(data: { name: string; email: string; subject: string; message: string }) =>
			data,
	)
	.handler(async ({ data }) => {
		const response = await fetch(env.DISCORD_CONTACT_WEBHOOK, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				embeds: [
					{
						title: "Contact Form Submission",
						fields: [
							{ name: "Name", value: data.name.trim() || "Not provided" },
							{ name: "Email", value: data.email.trim() || "Not provided" },
							{ name: "Subject", value: data.subject.trim() || "No Subject" },
							{
								name: "Message",
								value: data.message.trim() || "Empty message",
							},
						],
					},
				],
			}),
		});

		if (!response.ok) {
			throw new Error("Discord API rejected the request");
		}

		return { success: true };
	});
