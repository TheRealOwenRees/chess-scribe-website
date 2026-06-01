import LichessPgnViewer from "lichess-pgn-viewer";
import type PgnViewerType from "lichess-pgn-viewer/pgnViewer";
import { useEffect, useRef } from "react";

interface IProps {
	gamePgn: string;
}

const PgnViewer = ({ gamePgn }: IProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const viewerRef = useRef<PgnViewerType | null>(null);

	useEffect(() => {
		const element: HTMLElement | null = document.querySelector(".lpv-board");
		if (!element) return;

		viewerRef.current = LichessPgnViewer(element, {
			pgn: gamePgn,
			scrollToMove: false,
		});

		return () => {
			if (containerRef.current) {
				containerRef.current = null;
			}
		};
	}, [gamePgn]);

	return <div ref={containerRef} className="lpv-board" />;
};

export default PgnViewer;
