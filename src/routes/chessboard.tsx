import { createFileRoute } from "@tanstack/react-router";
import { HOST_URL } from "#/config.ts";
import Chessboard from "#/pages/Chessboard.tsx";

export const Route = createFileRoute("/chessboard")({
	head: () => ({
		meta: [{ title: "ChessScribe | Chessboard" }],
		links: [{ rel: "canonical", href: `${HOST_URL}/chessboard` }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Chessboard />;
}
