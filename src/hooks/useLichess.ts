import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { useLichessUser } from "#/context/LichessUserContext.tsx";
import {
	getSession,
	getStudyChapters,
	getToken,
	getUser,
	getUserStudies,
	login,
	logout,
	setSession,
} from "#/server/lichess.ts";
import { getHeaders } from "#/utils/pgnUtils.ts";

interface ITokenData {
	access_token: string;
	expires_in: number;
	token_type: string;
}

export type IUserStudy = {
	id: string;
	name: string;
	createdAt: number;
	updatedAt: number;
};

export interface IUserStudyChapter {
	chapterId: string;
	name: string;
	pgn: string;
}

export const useLichess = () => {
	const { user, setUser } = useLichessUser();
	const [userStudies, setUserStudies] = useState<IUserStudy[]>([]);
	const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
	const [studyChapters, setStudyChapters] = useState<
		IUserStudyChapter[] | null
	>(null);

	const loginFn = useServerFn(login);
	const logoutFn = useServerFn(logout);
	const accessTokenFn = useServerFn(getToken);
	const getUserFn = useServerFn(getUser);
	const setSessionFn = useServerFn(setSession);
	const getSessionFn = useServerFn(getSession);
	const getUserStudiesFn = useServerFn(getUserStudies);
	const getStudyChaptersFn = useServerFn(getStudyChapters);

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
		const studies: IUserStudy[] | undefined = await getUserStudiesFn();
		if (!studies) return;
		setUserStudies(studies);
	};

	const getLichessStudyChapters = async ({ studyId }: { studyId: string }) => {
		if (!user) throw new Error("User not found");
		const chapters: IUserStudyChapter[] | undefined = await getStudyChaptersFn({
			data: { studyId },
		});
		if (!chapters) return;
		return chapters;
	};

	// return headers and pgn from the Lichess chapter
	const loadLichessStudyChapter = async ({
		chapter,
	}: {
		chapter: IUserStudyChapter;
	}) => {
		const pgn = chapter.pgn.trim();

		if (!chapter.pgn) throw new Error("No valid PGN found for chapter");

		const headers = {
			...getHeaders(pgn),
			title: "",
			subtitle: "",
			author: "",
		};

		return { headers, pgn };
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
		userStudies,
		setUserStudies,
		setSelectedStudyId,
		selectedStudyId,
		getLichessStudyChapters,
		studyChapters,
		setStudyChapters,
		loadLichessStudyChapter,
	};
};
