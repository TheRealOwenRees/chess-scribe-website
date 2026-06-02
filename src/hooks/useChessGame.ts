import { type ChangeEvent, useReducer, useRef, useState } from "react";
import { gameReducer, initialGameState } from "#/reducers/gameReducer.ts";
import { downloadPDF } from "#/utils/pdfUtils.ts";
import { buildPgnString, getHeaders } from "#/utils/pgnUtils.ts";
import { downloadString } from "#/utils/stringUtils.ts";

interface IPosition {
	ply: number;
	fen: string;
}

export const useChessGame = () => {
	const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

	const [currentPosition, setCurrentPosition] = useState<IPosition>({
		ply: 0,
		fen: "",
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handlePlyChange = ({ ply, fen }: { ply: number; fen: string }) => {
		setCurrentPosition({ ply, fen });
	};

	const handleSavePgn = () => {
		const pgnString = buildPgnString(gameState);
		downloadString(pgnString, "game.pgn");
	};

	const handleSavePdf = async () => {
		console.log("Save PDF", gameState.diagrams, gameState.diagramClock);

		try {
			const { diagrams, diagramClock } = gameState;
			const pgnString = buildPgnString(gameState);

			const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

			const response = await fetch(`${apiBaseUrl}/pdf`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pgn: pgnString,
					diagrams,
					diagramClock,
				}),
			});

			if (response.ok) {
				downloadPDF(await response.blob());
				// TODO toast
			} else {
				const body = await response.json();
				// TODO toast and remove console but pass to logger
				console.error("Error saving PDF:", body.error);
			}
		} catch (error: unknown) {
			console.error("Error saving PDF:", error);

			if (error instanceof Error) {
				// do something here such as toast
			}
		}
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

	const handleToggleDiagram = () => {
		if (!gameState.pgn) return;
		const { ply, fen } = currentPosition;
		if (ply === 0) return;
		const exists = gameState.diagrams.some((d) => d.ply === ply);

		gameDispatch(
			exists
				? { type: "DELETE_DIAGRAM", payload: { ply } }
				: { type: "ADD_DIAGRAM", payload: { ply, fen } },
		);
	};

	return {
		gameState,
		fileInputRef,
		handleSavePgn,
		handleSavePdf,
		handleClearGame,
		handleLoadPgn,
		handleToggleClock,
		handlePlyChange,
		handleToggleDiagram,
		currentPosition,
	};
};
