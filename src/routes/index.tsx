import { createFileRoute } from "@tanstack/react-router";
import { HOST_URL } from "#/config.ts";
import Home from "#/pages";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: "ChessScribe | Home" }],
		links: [{ rel: "canonical", href: HOST_URL }],
	}),
	component: App,
});

function App() {
	return <Home />;
}
