import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { type ReactNode, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { MatomoAnalytics } from "#/components/MatomoAnalytics.tsx";
import { LichessUserProvider } from "#/context/LichessUserContext.tsx";
import Footer from "../components/Footer";
import Header from "../components/Header";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "ChessScribe",
			},
			{
				name: "description",
				content: "Create PDFs of your chess games from a PGN file",
			},
			{
				name: "keywords",
				content: "chess, pgn, pdf, chess games, chess notation",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.svg",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased">
				<LichessUserProvider>
					<Header />
					{children}
					<ToastContainer position="bottom-right" />
					<Footer />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</LichessUserProvider>
				<Scripts />
				<Suspense fallback={null}>
					<MatomoAnalytics />
				</Suspense>
			</body>
		</html>
	);
}
