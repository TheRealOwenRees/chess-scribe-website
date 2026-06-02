import LichessPgnViewer from "lichess-pgn-viewer";
import { useEffect, useRef } from "react";

interface IProps {
	gamePgn: string;
}

const PgnViewer = ({ gamePgn }: IProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const viewerRef = useRef(null);

	useEffect(() => {
		const element: HTMLElement | null = document.querySelector(".lpv-board");
		if (!element) return;

		viewerRef.current = LichessPgnViewer(element, {
			pgn: gamePgn,
			scrollToMove: false,
		});

		// BOARD EVENT LISTENERS - MOVE INTO HOOK?
		const boardButtons = document.querySelectorAll(".lpv__controls");
		const movesList = document.querySelectorAll(".lpv__moves");
		if (!boardButtons || !movesList) return;

		const clickHandlerDelay = () => {
			setTimeout(() => handleClick(), 250);
		};

		const boardEventListener = () => {
			const variationTags = document.querySelector("variation");
			const moves = [...document.querySelectorAll("move")].filter((m) => {
				if (!variationTags) return m.className !== "empty";
				return (
					m.parentNode?.querySelector("variation") && m.className !== "empty"
				);
			});
			const ply = moves.findIndex((m) => m.classList.contains("current")) + 1;
			return { moves, ply };
		};

		const handleClick = () => {
			const { ply, moves } = boardEventListener();
			console.log(ply, moves);
		};

		boardButtons.forEach((button) => {
			button.addEventListener("click", handleClick);
			button.addEventListener("touchstart", handleClick);
		});

		movesList.forEach((move) => {
			move.addEventListener("click", clickHandlerDelay);
			move.addEventListener("touchstart", clickHandlerDelay);
		});

		return () => {
			if (containerRef.current) {
				containerRef.current = null;
			}

			boardButtons.forEach((button) => {
				button.removeEventListener("click", handleClick);
				button.removeEventListener("touchstart", handleClick);
			});

			movesList.forEach((move) => {
				move.removeEventListener("click", clickHandlerDelay);
				move.removeEventListener("touchstart", clickHandlerDelay);
			});
		};
	}, [gamePgn]);

	return <div ref={containerRef} className="lpv-board" />;
};

export default PgnViewer;
