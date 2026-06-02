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
	handleToggleDiagram: () => void;
	fileInputRef: RefObject<HTMLInputElement | null>;
}

const Chessboard = ({
	gameState,
	handleLoadPgn,
	handleClearGame,
	handleSavePgn,
	handleSavePdf,
	handleToggleClock,
	handleToggleDiagram,
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
			<div className="flex justify-between max-w-150 mt-2">
				<div className="flex gap-2 items-center">
					<label
						htmlFor="diagram-add"
						className="text-sm text-(--base-content)"
					>
						Select Diagram
					</label>
					<input
						id="diagram-add"
						name="diagram-add"
						type="checkbox"
						className="checkbox-accent"
						onChange={handleToggleDiagram}
					/>
				</div>

				<label className="toggle text-sm text-(--base-content)">
					Render move times
					<input
						id="render-times"
						name="render-times"
						type="checkbox"
						checked={gameState.diagramClock}
						onChange={handleToggleClock}
					/>
					<span className="slider round" />
				</label>
			</div>
		</main>
	);
};

export default Chessboard;
