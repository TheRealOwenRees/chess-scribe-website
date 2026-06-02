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
