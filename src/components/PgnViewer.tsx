import { useLichessPgnViewer } from "#/hooks/useLichessPgnViewer.ts";
import type { IPosition } from "#/interfaces.ts";

interface IProps {
	gamePgn: string;
	handlePlyChange: ({ ply, fen }: IPosition) => void;
}

const PgnViewer = ({ gamePgn, handlePlyChange }: IProps) => {
	useLichessPgnViewer({ gamePgn, handlePlyChange });

	return <div className="lpv-board" />;
};

export default PgnViewer;
