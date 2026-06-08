import { useServerFn } from "@tanstack/react-start";
import { useLichessUser } from "#/context/LichessUserContext.tsx";
import { getToken, getUser, login, setSession, logout } from "#/server/lichess.ts";

interface ITokenData {
	access_token: string;
	expires_in: number;
	token_type: string;
}

export const useLichessOAuth = () => {
	const { setUser } = useLichessUser();

	const loginFn = useServerFn(login);
	const logoutFn = useServerFn(logout)
	const accessTokenFn = useServerFn(getToken);
	const getUserFn = useServerFn(getUser);
	const setSessionFn = useServerFn(setSession);

	const lichessAccessToken = async ({ code }: { code: string }) => {
		return accessTokenFn({ data: { code } });
	};

	const setLichessUser = async ({
		username,
		id,
	}: {
		username: string;
		id: string;
	}) => {
		await setSessionFn({ data: { username, id } });
		setUser({ username, id, isLoggedIn: true });
	};

	const getLichessUser = async ({ tokenData }: { tokenData: ITokenData }) => {
		return getUserFn({
			data: { access_token: tokenData.access_token },
		});
	};

	const lichessLogin = async () => {
		// TODO add try/catch with toast
		await loginFn();
	};

	const lichessLogout = async () => {
		console.log("Lichess Logout");
		// TODO remove cookies
		await logoutFn();
		setUser(null);
	};

	return {
		lichessLogin,
		lichessLogout,
		lichessAccessToken,
		getLichessUser,
		setLichessUser,
	};
};
