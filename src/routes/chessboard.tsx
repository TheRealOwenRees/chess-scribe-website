import { createFileRoute } from "@tanstack/react-router";
import ChessboardContainer from "#/pages/Chessboard.container.tsx";

export const Route = createFileRoute("/chessboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ChessboardContainer />;
}
