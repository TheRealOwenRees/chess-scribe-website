import { createFileRoute } from "@tanstack/react-router";
import Chessboard from "#/pages/Chessboard.tsx";

export const Route = createFileRoute("/chessboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Chessboard />;
}
