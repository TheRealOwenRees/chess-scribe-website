import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";
import GenericErrorView from "#/components/Error/GenericErrorView.tsx";
import Callback from "#/pages/Callback.tsx";

const callbackSchema = z.object({
	code: z.string(),
});

export const Route = createFileRoute("/callback")({
	validateSearch: (search) => callbackSchema.parse(search),

	beforeLoad: ({ search }) => {
		if (!search.code) {
			throw notFound();
		}
	},

	component: RouteComponent,
	errorComponent: ({ error, reset }) => (
		<GenericErrorView error={error} resetErrorBoundary={reset} />
	),
});

function RouteComponent() {
	return <Callback />;
}
