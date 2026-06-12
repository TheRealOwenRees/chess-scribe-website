import type { infer } from "zod";
import type { TokenResponseSchema } from "#/schemas.ts";

export interface IPosition {
	ply: number;
	fen: string;
}

export interface IHeader {
	event: string;
	site: string;
	date: string;
	round: string;
	white: string;
	black: string;
	result: string;
	eco: string;
	whiteElo: string;
	blackElo: string;
	plyCount: string;
	eventDate: string;
	source: string;
	title: string;
	subtitle: string;
	author: string;
	[key: string]: string;
}

export interface IGameState {
	pgn: string;
	headers: IHeader;
	diagrams: IPosition[];
	diagramClock: boolean;
}

export interface ITokenData extends infer<typeof TokenResponseSchema> {}

export interface IUserStudy {
	id: string;
	name: string;
	createdAt: number;
	updatedAt: number;
}

export interface IUserStudyChapter {
	chapterId: string;
	name: string;
	pgn: string;
}
