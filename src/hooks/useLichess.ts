import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { useLichessUser } from "#/context/LichessUserContext.tsx";
import type {
	ITokenData,
	IUserStudy,
	IUserStudyChapter,
} from "#/interfaces.ts";
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

type Status = "loading" | "success" | "error";

type ParseLichessStudyLinkResult =
	| { ok: true; studyId: string }
	| { ok: false; error: string };

const LICHESS_STUDY_LINK_RE =
	/^https?:\/\/lichess\.org\/study\/([A-Za-z0-9]{8})(?:\.pgn)?(?:$|\/|\?|#)/i;

export const useLichess = () => {
	const { user, setUser } = useLichessUser();
	const [userStudies, setUserStudies] = useState<IUserStudy[]>([]);
	const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);

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
		setUser({ username, id });
	};

	const getLichessUser = async ({ tokenData }: { tokenData: ITokenData }) => {
		return getUserFn({
			data: { access_token: tokenData.access_token },
		});
	};

	const lichessLogin = async () => await loginFn();

	const lichessLogout = async () => {
		await logoutFn();
		setSelectedStudyId(null);
		setUser(null);
	};

	const getLichessSession = async () => {
		return getSessionFn();
	};

	const useLichessCallback = ({ code }: { code: string }) => {
		const [status, setStatus] = useState<Status>("loading");
		const [error, setError] = useState<string | null>(null);

		useEffect(() => {
			if (!code) return;

			const isMounted = true;

			try {
				(async () => {
					const tokenData = await lichessAccessToken({ code });
					const userData = await getLichessUser({ tokenData });

					if (!isMounted) return;

					await setLichessUser({
						username: userData.username,
						id: userData.id,
						token: tokenData.access_token,
					});

					setStatus("success");
				})();
			} catch (err: unknown) {
				if (isMounted && err instanceof Error) {
					console.error("Lichess Authentication Error:", err);
					setError(err.message || "Failed to authenticate with Lichess");
					setStatus("error");
				}
			}
		}, [code]);

		return { status, error };
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

	// parse and process lichess study link
	const parseLichessStudyLink = (
		studyLink: string,
	): ParseLichessStudyLinkResult => {
		const trimmed = studyLink.trim();

		if (!trimmed) {
			return { ok: false, error: "Please paste a Lichess study link." };
		}

		const match = trimmed.match(LICHESS_STUDY_LINK_RE);

		if (!match) {
			return { ok: false, error: "Invalid Lichess study link." };
		}

		return { ok: true, studyId: match[1] };
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
		loadLichessStudyChapter,
		parseLichessStudyLink,
	};
};
