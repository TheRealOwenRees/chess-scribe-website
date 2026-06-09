import { getRouteApi } from "@tanstack/react-router";
import { useLichess } from "#/hooks/useLichess.ts";

const routeApi = getRouteApi("/callback");

const Callback = () => {
	const { useLichessCallback } = useLichess();
	const { code } = routeApi.useSearch();
	useLichessCallback({ code }).then();

	return <div>Loading...</div>;
};

export default Callback;
