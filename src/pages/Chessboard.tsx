import type { ChangeEvent, RefObject } from "react";
import LichessButton from "#/components/LichessButton.tsx";
import PgnViewer from "#/components/PgnViewer.tsx";
import Section from "#/components/Section.tsx";
import type { IGameState } from "#/reducers/gameReducer.ts";

interface IProps {
	gameState: IGameState;
	handleLoadPgn: (e: ChangeEvent<HTMLInputElement>) => void;
	handleClearGame: () => void;
	handleSavePgn: () => void;
	handleSavePdf: () => void;
	handleToggleClock: () => void;
	fileInputRef: RefObject<HTMLInputElement | null>;
}

const Chessboard = ({
	gameState,
	handleLoadPgn,
	handleClearGame,
	handleSavePgn,
	handleSavePdf,
	handleToggleClock,
	fileInputRef,
}: IProps) => {
	return (
		<main className="px-4 pb-8 place-self-center min-h-[calc(100vh-226px)]">
			<Section title="Convert PGN to PDF">
				<LichessButton /> or{" "}
				<input
					type="file"
					id="file-input"
					ref={fileInputRef}
					className="file-input max-w-xs"
					onChange={handleLoadPgn}
				/>
			</Section>

			<div className="flex gap-4">
				<button
					className="cursor-pointer"
					type="button"
					onClick={handleClearGame}
				>
					Clear Game
				</button>

				<button
					className="cursor-pointer"
					type="button"
					onClick={handleSavePgn}
					disabled={!gameState.pgn}
				>
					Save PGN
				</button>

				<button
					className="cursor-pointer"
					type="button"
					onClick={handleSavePdf}
					disabled={!gameState.pgn}
				>
					Save PDF
				</button>
			</div>
			<PgnViewer gamePgn={gameState.pgn || ""} />
			<label htmlFor="diagram-clock">
				Render Clock Times
				<input
					id="diagram-clock"
					name="diagram-clock"
					type="checkbox"
					onChange={handleToggleClock}
				/>
			</label>
		</main>
	);
};

export default Chessboard;
