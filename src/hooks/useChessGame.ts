import { type ChangeEvent, useReducer, useRef } from "react";
import { gameReducer, initialGameState } from "#/reducers/gameReducer.ts";
import { buildPgnString, getHeaders } from "#/utils/pgnUtils.ts";
import { downloadString } from "#/utils/stringUtils.ts";

export const useChessGame = () => {
	const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleSavePgn = () => {
		const pgnString = buildPgnString(gameState);
		downloadString(pgnString, "game.pgn");
	};

	const handleSavePdf = () => {
		console.log("Save PDF");
	};

	const handleClearGame = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}

		gameDispatch({
			type: "CLEAR_GAME",
		});
	};

	const handleLoadPgn = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const selectedFile = e.target.files?.[0];

		if (selectedFile?.name.endsWith(".pgn")) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const pgnData = event.target?.result;
				let pgnString = "";

				if (pgnData) {
					if (typeof pgnData === "string") {
						pgnString = pgnData;
					} else {
						pgnString = new TextDecoder().decode(pgnData);
					}
				}

				if (pgnString) {
					const headers = {
						...getHeaders(pgnString),
						title: "",
						subtitle: "",
					};
					gameDispatch({
						type: "SET_GAME",
						payload: { pgn: pgnString, headers: headers },
					});
				} else {
					e.target.files = null;
					handleClearGame();
				}
			};
			reader.readAsText(selectedFile);
		} else {
			handleClearGame();
		}
	};

	const handleToggleClock = () => {
		gameDispatch({
			type: "TOGGLE_DIAGRAM_CLOCK",
		});
	};

	const handleToggleDiagram = ({ ply, fen }: { ply: number; fen: string }) => {
		console.log("Toggle diagram", ply, fen);
	};

	return {
		gameState,
		fileInputRef,
		handleSavePgn,
		handleSavePdf,
		handleClearGame,
		handleLoadPgn,
		handleToggleClock,
		handleToggleDiagram,
	};
};
