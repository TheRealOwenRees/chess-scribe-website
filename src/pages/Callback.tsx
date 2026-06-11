import { getRouteApi, useNavigate } from "@tanstack/react-router";
import GenericErrorView from "#/components/GenericErrorView.tsx";
import LoadingView from "#/components/LoadingView.tsx";
import { useLichess } from "#/hooks/useLichess.ts";

const routeApi = getRouteApi("/callback");

const Callback = () => {
	const navigate = useNavigate();
	const { useLichessCallback } = useLichess();
	const { code } = routeApi.useSearch();
	const { status, error } = useLichessCallback({ code });

	if (status === "success") navigate({ to: "/chessboard" });

	if (status === "error") return <GenericErrorView error={error} />;

	return (
		<LoadingView title="Logging in..." description="Please wait a moment..." />
	);
};

export default Callback;
