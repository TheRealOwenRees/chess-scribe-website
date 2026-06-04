import Contact from "#/pages/Contact/Contact.tsx";
import { sendToDiscord } from "#/server/contact.ts";

const ContactContainer = () => {
	const handleSubmit = async (_prevState: unknown, data: FormData) => {
		const payload = {
			name: (data.get("name") as string) || "",
			email: (data.get("email") as string) || "",
			subject: (data.get("subject") as string) || "",
			message: (data.get("message") as string) || "",
		};

		try {
			await sendToDiscord({ data: payload });

			return {
				success: true,
				message: "Message sent successfully!",
			};
		} catch (error) {
			// TODO logger
			console.error("Error sending message:", error);

			return {
				success: false,
				message: "Failed to send message. Please try again.",
			};
		}
	};

	return <Contact handleSubmit={handleSubmit} />;
};

export default ContactContainer;
