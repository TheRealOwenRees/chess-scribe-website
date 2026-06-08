import { getRouteApi } from "@tanstack/react-router";
import { useLichessOAuth } from "#/hooks/useLichessOAuth.ts";

const routeApi = getRouteApi("/callback");

const Callback = () => {
	const { useLichessCallback } = useLichessOAuth();
	const { code } = routeApi.useSearch();
	useLichessCallback({ code }).then();

	return <div>{code}</div>;
};

export default Callback;
