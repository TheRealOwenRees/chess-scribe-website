import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useLichess } from "#/hooks/useLichess.ts";

const routeApi = getRouteApi("/callback");

const Callback = () => {
	const navigate = useNavigate();
	const { useLichessCallback } = useLichess();
	const { code } = routeApi.useSearch();
	const { status, error } = useLichessCallback({ code });

	if (status === "success") navigate({ to: "/chessboard" });

	if (status === "error") {
		console.error(error);
	}

	return <div>Loading...</div>;
};

export default Callback;
