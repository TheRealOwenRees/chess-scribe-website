import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";
import GenericErrorView from "#/components/GenericErrorView.tsx";
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
	errorComponent: ({ error }) => <GenericErrorView error={error} />,
});

function RouteComponent() {
	return <Callback />;
}
