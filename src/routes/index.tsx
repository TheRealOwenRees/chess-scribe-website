import { createFileRoute } from "@tanstack/react-router";
import { HOST_URL } from "#/config.ts";
import Home from "#/pages";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "ChessScribe | Home" },
			{
				name: "description",
				content: "Create PDFs of your chess games from a PGN file",
			},
			{
				name: "keywords",
				content: "chess, pgn, pdf, chess games, chess notation",
			},
		],
		links: [{ rel: "canonical", href: HOST_URL }],
	}),
	component: App,
});

function App() {
	return <Home />;
}
