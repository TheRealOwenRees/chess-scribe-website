import { createFileRoute } from "@tanstack/react-router";
import Home from "#/pages";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return <Home />;
}
