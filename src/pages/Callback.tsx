import { getRouteApi } from "@tanstack/react-router";
import { useLichessCallback } from "#/hooks/useLichessCallback.ts";

const routeApi = getRouteApi("/callback");

const Callback = () => {
	const { code } = routeApi.useSearch();
	useLichessCallback({ code });

	return <div>{code}</div>;
};

export default Callback;
