import type { IGameState, IHeader, IPosition } from "#/interfaces.ts";
import { diagramKey } from "#/utils/pgnUtils.ts";

export type GameAction =
	| { type: "SET_GAME"; payload: { pgn: string; headers: IHeader } }
	| { type: "CLEAR_GAME" }
	| { type: "SET_HEADERS"; payload: IHeader }
	| { type: "ADD_DIAGRAM"; payload: IPosition }
	| { type: "DELETE_DIAGRAM"; payload: { path: string[] } }
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
					(diagram: IPosition) =>
						diagramKey(diagram.path) !== diagramKey(action.payload.path),
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
