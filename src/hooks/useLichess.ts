import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { useLichessUser } from "#/context/LichessUserContext.tsx";
import {
	getSession,
	getToken,
	getUser,
	getUserStudies,
	login,
	logout,
	setSession,
} from "#/server/lichess.ts";

interface ITokenData {
	access_token: string;
	expires_in: number;
	token_type: string;
}

export const useLichess = () => {
	const { user, setUser } = useLichessUser();

	const loginFn = useServerFn(login);
	const logoutFn = useServerFn(logout);
	const accessTokenFn = useServerFn(getToken);
	const getUserFn = useServerFn(getUser);
	const setSessionFn = useServerFn(setSession);
	const getSessionFn = useServerFn(getSession);
	const getUserStudiesFn = useServerFn(getUserStudies);

	const lichessAccessToken = async ({ code }: { code: string }) => {
		return accessTokenFn({ data: { code } });
	};

	const setLichessUser = async ({
		username,
		id,
		token,
	}: {
		username: string;
		id: string;
		token: string;
	}) => {
		await setSessionFn({ data: { username, id, token } });
		setUser({ username, id, isLoggedIn: true });
	};

	const getLichessUser = async ({ tokenData }: { tokenData: ITokenData }) => {
		return getUserFn({
			data: { access_token: tokenData.access_token },
		});
	};

	const lichessLogin = async () => await loginFn();

	const lichessLogout = async () => {
		await logoutFn();
		setUser(null);
	};

	const getLichessSession = async () => {
		return getSessionFn();
	};

	const useLichessCallback = async ({ code }: { code: string }) => {
		const navigate = useNavigate();

		useEffect(() => {
			if (!code) return;

			(async () => {
				const tokenData = await lichessAccessToken({ code });
				const userData = await getLichessUser({ tokenData });

				await setLichessUser({
					username: userData.username,
					id: userData.id,
					token: tokenData.access_token,
				});
				await navigate({ to: "/chessboard" });
			})();
		}, [navigate, code]);
	};

	const getLichessUserStudies = async () => {
		if (!user) throw new Error("User not found");
		await getUserStudiesFn();
	};

	return {
		lichessLogin,
		lichessLogout,
		lichessAccessToken,
		getLichessUser,
		setLichessUser,
		getLichessSession,
		useLichessCallback,
		getLichessUserStudies,
	};
};
