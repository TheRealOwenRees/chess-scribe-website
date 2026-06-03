import LichessPgnViewer from "lichess-pgn-viewer";
import { type RefObject, useEffect, useRef } from "react";
import type { IPosition } from "#/interfaces.ts";

type ViewerRef = ReturnType<typeof LichessPgnViewer>;
type HandlePlyChange = ({ ply, fen }: IPosition) => void;

interface IHandleBoardClick {
	viewerRef: RefObject<ViewerRef | null>;
	handlePlyChange: HandlePlyChange;
}

interface IProps {
	gamePgn: string;
	handlePlyChange: HandlePlyChange;
}

const getBoardEventData = () => {
	const variationTags = document.querySelector("variation");
	const moves = [...document.querySelectorAll("move")].filter((m) => {
		if (!variationTags) return m.className !== "empty";
		return m.parentNode?.querySelector("variation") && m.className !== "empty";
	});
	const ply = moves.findIndex((m) => m.classList.contains("current")) + 1;
	return { moves, ply };
};

const handleBoardClick = ({
	viewerRef,
	handlePlyChange,
}: IHandleBoardClick) => {
	const { ply } = getBoardEventData();
	const fen = viewerRef.current?.curData().fen ?? "";
	handlePlyChange({ ply, fen });
};

export const useLichessPgnViewer = ({ gamePgn, handlePlyChange }: IProps) => {
	const viewerRef = useRef<ViewerRef | null>(null);

	useEffect(() => {
		const element: HTMLElement | null = document.querySelector(".lpv-board");
		if (!element) return;

		viewerRef.current = LichessPgnViewer(element, {
			pgn: gamePgn,
			scrollToMove: false,
		});

		const boardButtons = document.querySelectorAll(".lpv__controls");
		const movesList = document.querySelectorAll(".lpv__moves");
		if (!boardButtons || !movesList) return;

		const handleClick = () => handleBoardClick({ viewerRef, handlePlyChange });
		const clickHandlerDelay = () => setTimeout(() => handleClick, 250);

		boardButtons.forEach((button) => {
			button.addEventListener("click", handleClick);
			button.addEventListener("touchstart", handleClick);
		});

		movesList.forEach((move) => {
			move.addEventListener("click", clickHandlerDelay);
			move.addEventListener("touchstart", clickHandlerDelay);
		});

		return () => {
			boardButtons.forEach((button) => {
				button.removeEventListener("click", handleClick);
				button.removeEventListener("touchstart", handleClick);
			});

			movesList.forEach((move) => {
				move.removeEventListener("click", clickHandlerDelay);
				move.removeEventListener("touchstart", clickHandlerDelay);
			});
		};
	}, [gamePgn, handlePlyChange]);

	return viewerRef;
};
