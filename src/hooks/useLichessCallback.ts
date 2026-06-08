import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLichessOAuth } from "#/hooks/useLichessOAuth.ts";

interface IProps {
	code: string;
}

export const useLichessCallback = ({ code }: IProps) => {
	const navigate = useNavigate();

	const { lichessAccessToken, getLichessUser, setLichessUser } =
		useLichessOAuth();

	useEffect(() => {
		if (!code) return;

		(async () => {
			const tokenData = await lichessAccessToken({ code });
			const userData = await getLichessUser({ tokenData });
			await setLichessUser({ username: userData.username, id: userData.id });
			await navigate({ to: "/chessboard" });
			// TODO set logging in state then redirect
		})();
	}, [code, lichessAccessToken, getLichessUser, setLichessUser, navigate]);
};
