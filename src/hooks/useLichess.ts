import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { getToken, login } from "#/server/lichess.ts";

export const useLichess = () => {
	const [lichessUser, setLichessUser] = useState();

	const triggerLogin = useServerFn(login);
	const trigggerGetToken = useServerFn(getToken);

	console.log("Lichess User:", lichessUser);

	const lichessTokenVerification = async ({ code }) => {
		await trigggerGetToken();
	};

	const lichessLogin = async () => {
		// TODO add try/catch with toast
		await triggerLogin();
	};

	const lichessLogout = () => {
		console.log("Lichess Logout");
	};

	return {
		lichessLogin,
		lichessLogout,
		lichessTokenVerification,
	};
};
