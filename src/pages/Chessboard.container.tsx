import { useChessGame } from "#/hooks/useChessGame.ts";
import Chessboard from "#/pages/Chessboard.tsx";

const ChessboardContainer = () => {
	const chessGameProps = useChessGame();

	return (
		<Chessboard
			gameState={chessGameProps.gameState}
			handleLoadPgn={chessGameProps.handleLoadPgn}
			handleClearGame={chessGameProps.handleClearGame}
			handleSavePgn={chessGameProps.handleSavePgn}
			handleSavePdf={chessGameProps.handleSavePdf}
			handleToggleClock={chessGameProps.handleToggleClock}
			fileInputRef={chessGameProps.fileInputRef}
		/>
	);
};

export default ChessboardContainer;
