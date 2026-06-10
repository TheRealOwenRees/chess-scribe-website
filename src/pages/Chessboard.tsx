import { lazy, Suspense } from "react";
import CustomHeaders from "#/components/CustomHeaders.tsx";
import HeaderFields from "#/components/HeaderFields.tsx";
import LichessButton from "#/components/LichessButton.tsx";
import Section from "#/components/Section.tsx";
import SelectLichessStudy from "#/components/SelectLichessStudy.tsx";
import SelectStudyChapter from "#/components/SelectStudyChapter.tsx";
import { useLichessUser } from "#/context/LichessUserContext.tsx";
import { useChessGame } from "#/hooks/useChessGame.ts";
import { useLichess } from "#/hooks/useLichess.ts";

const PgnViewer = lazy(() => import("#/components/PgnViewer.tsx"));

const LoadingBoard = () => {
	return (
		<div className="relative grid h-125 w-160 items-center text-center">
			<div id="loading-bar-spinner" className="spinner">
				<div className="spinner-icon"></div>
			</div>
		</div>
	);
};

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
		gameDispatch,
	} = useChessGame();

	const { selectedStudyId, setSelectedStudyId, setStudyChapters } =
		useLichess();

	const { user } = useLichessUser();

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
				{user ? (
					<SelectLichessStudy
						setSelectedStudyId={setSelectedStudyId}
						setStudyChapters={setStudyChapters}
					/>
				) : null}
				<div />
				{selectedStudyId && user ? (
					<SelectStudyChapter
						selectedStudyId={selectedStudyId || ""}
						gameDispatch={gameDispatch}
					/>
				) : null}
			</Section>

			<div className="grid lg:grid-cols-2 gap-4">
				<Suspense fallback={<LoadingBoard />}>
					<div className="mx-auto">
						<PgnViewer
							gamePgn={gameState.pgn || ""}
							handlePlyChange={handlePlyChange}
						/>
						<div className="grid grid-cols-12 gap-4 max-w-150 mt-2">
							<button
								className="btn btn-primary col-span-5 flex items-center justify-center"
								type="button"
								onClick={handleClearGame}
							>
								<p className="text-sm font-semibold">Clear Game</p>
							</button>
							<div className="flex gap-1 items-center col-span-3">
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

							<label className="toggle text-sm text-(--base-content) col-span-4">
								Render move times
								<input
									id="render-times"
									name="render-times"
									type="checkbox"
									disabled={!gameState.pgn}
									checked={gameState.diagramClock}
									onChange={handleToggleClock}
								/>
								<span className="slider round" />
							</label>
						</div>
					</div>
				</Suspense>

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
