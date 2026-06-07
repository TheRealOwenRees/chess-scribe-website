import { useServerFn } from "@tanstack/react-start";
import { useLichessUser } from "#/context/LichessUserContext.tsx";
import { getToken, login } from "#/server/lichess.ts";

export const useLichess = () => {
	const { user, setUser, logout } = useLichessUser();

	const triggerLogin = useServerFn(login);
	const trigggerGetToken = useServerFn(getToken);

	console.log("Lichess User:", user);

	const lichessTokenVerification = async ({ code }) => {
		await trigggerGetToken();
	};

	const lichessLogin = async () => {
		// TODO add try/catch with toast
		await triggerLogin();
	};

	const lichessLogout = () => {
		console.log("Lichess Logout");
		// TODO remove cookies
		logout();
	};

	return {
		lichessLogin,
		lichessLogout,
		lichessTokenVerification,
	};
};
