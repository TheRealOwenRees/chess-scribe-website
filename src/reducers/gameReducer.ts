interface IDiagrams {
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
	[key: string]: string;
}

export interface IGameState {
	pgn: string;
	headers: IHeader;
	diagrams: IDiagrams[];
	diagramClock: boolean;
}

type GameAction =
	| { type: "SET_GAME"; payload: { pgn: string; headers: IHeader } }
	| { type: "CLEAR_GAME" }
	| { type: "SET_HEADERS"; payload: IHeader }
	| { type: "ADD_DIAGRAM"; payload: IDiagrams }
	| { type: "DELETE_DIAGRAM"; payload: { ply: number } }
	| { type: "TOGGLE_DIAGRAM_CLOCK" };

const defaultHeaderFields = {
	event: "",
	site: "",
	date: "",
	round: "",
	white: "",
	black: "",
	result: "",
	eco: "",
	whiteElo: "",
	blackElo: "",
	plyCount: "",
	eventDate: "",
	source: "",
	title: "",
	subtitle: "",
	author: "",
} satisfies IHeader;

export const initialGameState: IGameState = {
	pgn: "",
	headers: defaultHeaderFields,
	diagrams: [],
	diagramClock: false,
};

export const gameReducer = (state: IGameState, action: GameAction) => {
	switch (action.type) {
		case "SET_GAME":
			return {
				pgn: action.payload.pgn,
				headers: action.payload.headers,
				diagrams: [],
				diagramClock: false,
			};
		case "CLEAR_GAME":
			return initialGameState;
		case "SET_HEADERS":
			return {
				...state,
				headers: action.payload,
			};
		case "ADD_DIAGRAM":
			return {
				...state,
				diagrams: [...state.diagrams, action.payload],
			};
		case "DELETE_DIAGRAM":
			return {
				...state,
				diagrams: state.diagrams.filter(
					(diagram: IDiagrams) => diagram.ply !== action.payload.ply,
				),
			};
		case "TOGGLE_DIAGRAM_CLOCK":
			return {
				...state,
				diagramClock: !state.diagramClock,
			};
		default:
			return state;
	}
};
