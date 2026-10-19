import LichessPgnViewer from "lichess-pgn-viewer";
import { useEffect, useRef } from "react";
import type { IPosition } from "#/interfaces.ts";

type ViewerRef = ReturnType<typeof LichessPgnViewer>;
type HandlePlyChange = (position: IPosition) => void;

interface ViewerPath {
	empty: () => boolean;
	init: () => ViewerPath;
}

interface ViewerMoveData {
	fen: string;
	ply: number;
	path: ViewerPath;
}

interface ViewerNode {
	data?: { san: string };
}

interface ViewerGame {
	nodeAt: (path: ViewerPath) => ViewerNode | undefined;
}

interface IProps {
	gamePgn: string;
	handlePlyChange: HandlePlyChange;
}

const getPosition = (viewer: ViewerRef | null): IPosition | null => {
	if (!viewer) return null;

	const data = viewer.curData() as unknown as Partial<ViewerMoveData>;
	if (typeof data.ply !== "number" || !data.path || !data.fen) return null;

	const game = viewer.game as unknown as ViewerGame;
	const path: string[] = [];
	let current = data.path;
	while (!current.empty()) {
		const node = game.nodeAt(current);
		if (node?.data) path.unshift(node.data.san);
		current = current.init();
	}

	return { ply: data.ply, fen: data.fen, path };
};

export const useLichessPgnViewer = ({ gamePgn, handlePlyChange }: IProps) => {
	const viewerRef = useRef<ViewerRef | null>(null);
	const handlePlyChangeRef = useRef(handlePlyChange);
	const lastKeyRef = useRef("");
	handlePlyChangeRef.current = handlePlyChange;

	useEffect(() => {
		const host = document.querySelector<HTMLElement>(".lpv-board");
		if (!host) return;

		// Mount the viewer into a fresh child so React keeps ownership of the
		// host element and the viewer can replace its own root freely.
		host.replaceChildren();
		lastKeyRef.current = "";

		const mount = document.createElement("div");
		host.appendChild(mount);

		viewerRef.current = LichessPgnViewer(mount, {
			pgn: gamePgn,
			scrollToMove: false,
		});

		return () => {
			host.replaceChildren();
			viewerRef.current = null;
		};
	}, [gamePgn]);

	useEffect(() => {
		let timeout = 0;

		const updatePosition = () => {
			window.clearTimeout(timeout);
			timeout = window.setTimeout(() => {
				const position = getPosition(viewerRef.current);
				if (!position) return;

				const key = `${position.ply}|${position.path.join(" ")}`;
				if (key === lastKeyRef.current) return;

				lastKeyRef.current = key;
				handlePlyChangeRef.current(position);
			}, 0);
		};

		// Listen at the document level so the handler survives the viewer
		// re-rendering its inner DOM (it replaces the moves/controls nodes).
		const handleInteraction = (event: Event) => {
			const target = event.target;
			if (!(target instanceof Element) || !target.closest(".lpv")) return;
			updatePosition();
		};

		document.addEventListener("mousedown", handleInteraction);
		document.addEventListener("touchstart", handleInteraction);
		document.addEventListener("click", handleInteraction);
		document.addEventListener("keyup", handleInteraction);

		return () => {
			window.clearTimeout(timeout);
			document.removeEventListener("mousedown", handleInteraction);
			document.removeEventListener("touchstart", handleInteraction);
			document.removeEventListener("click", handleInteraction);
			document.removeEventListener("keyup", handleInteraction);
		};
	}, []);

	return viewerRef;
};
