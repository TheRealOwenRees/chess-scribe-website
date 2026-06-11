import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";
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
});

function RouteComponent() {
	return <Callback />;
}
