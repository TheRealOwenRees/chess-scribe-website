import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import Callback from "#/pages/Callback.tsx";

const callbackSchema = z.object({
	code: z.string(),
});

// type CallbackProps = z.infer<typeof callbackSchema>;

export const Route = createFileRoute("/callback")({
	validateSearch: (search) => callbackSchema.parse(search),
	component: RouteComponent,
});

function RouteComponent() {
	return <Callback />;
}
