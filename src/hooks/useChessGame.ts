import {
	type ChangeEvent,
	useCallback,
	useReducer,
	useRef,
	useState,
} from "react";
import { toast } from "react-toastify";
import type { IPosition } from "#/interfaces.ts";
import { gameReducer, initialGameState } from "#/reducers/gameReducer.ts";
import { downloadPDF } from "#/utils/pdfUtils.ts";
import { buildPgnString, getHeaders } from "#/utils/pgnUtils.ts";
import { downloadString } from "#/utils/stringUtils.ts";

export const useChessGame = () => {
	const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

	const [currentPosition, setCurrentPosition] = useState<IPosition>({
		ply: 0,
		fen: "",
	});

	const [generatingPdf, setGeneratingPdf] = useState(false);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handlePlyChange = useCallback(({ ply, fen }: IPosition) => {
		setCurrentPosition({ ply, fen });
	}, []);

	const handleSavePgn = () => {
		const pgnString = buildPgnString(gameState);
		downloadString(pgnString, "game.pgn");
	};

	const handleSavePdf = async () => {
		try {
			setGeneratingPdf(true);
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

				// TODO add metrics logger - add success to analytics

				toast.success("PDF successfully generated!", {
					toastId: "pdf-success",
				});
			} else {
				// TODO toast and remove console but pass to logger
				const body = await response.json();
				console.error("Error saving PDF:", body.error);

				toast.error("An error has occurred. Please try again later.", {
					toastId: "pdf-error",
				});
			}
		} catch (error: unknown) {
			// TODO add metrics / logger
			console.error("Error saving PDF:", error);

			if (error instanceof Error) {
				toast.error("An error has occurred. Please try again later.", {
					toastId: "pdf-error",
				});
			}
		} finally {
			setGeneratingPdf(false);
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
		generatingPdf,
	};
};
