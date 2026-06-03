import { createFileRoute } from "@tanstack/react-router";
import { HOST_URL } from "#/config.ts";
import ContactContainer from "#/pages/Contact/Contact.container.tsx";

export const Route = createFileRoute("/contact")({
	head: () => ({
		meta: [{ title: "ChessScribe | Contact" }],
		links: [{ rel: "canonical", href: `${HOST_URL}/contact` }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <ContactContainer />;
}
