import CustomHeaders from "#/components/CustomHeaders.tsx";
import HeaderFields from "#/components/HeaderFields.tsx";
import LichessButton from "#/components/LichessButton.tsx";
import PgnViewer from "#/components/PgnViewer.tsx";
import Section from "#/components/Section.tsx";
import { useChessGame } from "#/hooks/useChessGame.ts";

const Chessboard = () => {
	const {
		gameState,
		fileInputRef,
		currentPosition,
		generatingPdf,
		handleLoadPgn,
		handleClearGame,
		handleSavePgn,
		handleSavePdf,
		handleToggleClock,
		handleToggleDiagram,
		handlePlyChange,
		updateHeaders,
	} = useChessGame();

	return (
		<main className="px-4 pb-8 place-self-center min-h-[calc(100vh-226px)]">
			<Section title="Convert PGN to PDF">
				<LichessButton onClickHandler={() => console.log("Lichess Login")} /> or{" "}
				<input
					type="file"
					id="file-input"
					ref={fileInputRef}
					className="file-input max-w-xs"
					onChange={handleLoadPgn}
				/>
			</Section>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<PgnViewer
						gamePgn={gameState.pgn || ""}
						handlePlyChange={handlePlyChange}
					/>
					<div className="grid grid-cols-3 gap-2 max-w-150 mt-2">
						<button
							className="btn btn-primary"
							type="button"
							onClick={handleClearGame}
						>
							Clear Game
						</button>
						<div className="flex gap-2 items-center">
							<label
								htmlFor="diagram-add"
								className="text-sm text-(--base-content)"
							>
								Select Diagram
							</label>
							<input
								id="diagram-toggle"
								name="diagram-toggle"
								type="checkbox"
								className="checkbox-accent"
								checked={gameState.diagrams.some(
									(d) => d.ply === currentPosition.ply,
								)}
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
				</div>

				<div className="flex flex-col gap-4 items-center">
					<div className="flex justify-center gap-4">
						<button
							className="btn btn-secondary"
							type="button"
							onClick={handleSavePgn}
							disabled={!gameState.pgn}
						>
							Save PGN
						</button>

						<button
							className="btn btn-secondary"
							type="button"
							onClick={handleSavePdf}
							disabled={!gameState.pgn || generatingPdf}
						>
							Save PDF
						</button>
					</div>

					<HeaderFields
						headers={gameState.headers}
						updateHeaders={updateHeaders}
					/>
					<CustomHeaders
						headers={gameState.headers}
						updateHeaders={updateHeaders}
					/>
				</div>
			</div>
		</main>
	);
};

export default Chessboard;
