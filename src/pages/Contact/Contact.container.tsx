import Contact from "#/pages/Contact/Contact.tsx";

const ContactContainer = () => {
	const handleSubmit = async (_prevState: unknown, data: FormData) => {
		const name = data.get("name");
		const email = data.get("email");
		const subject = data.get("subject");
		const message = data.get("message");

		try {
			return { success: true, message: "Message sent!" };
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
