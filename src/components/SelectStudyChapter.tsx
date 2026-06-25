import {
	type Dispatch,
	useActionState,
	useEffect,
	useRef,
	useState,
} from "react";
import { toast } from "react-toastify";
import { useClickOutside } from "#/hooks/useClickOutside.ts";
import { useLichess } from "#/hooks/useLichess.ts";
import type { IUserStudyChapter } from "#/interfaces.ts";
import type { GameAction } from "#/reducers/gameReducer.ts";

interface IProps {
	selectedStudyId: string;
	gameDispatch: Dispatch<GameAction>;
}

type ChapterState = {
	status: "idle" | "success" | "error";
	chapters: IUserStudyChapter[];
	error: string | null;
};

const initialChapterState: ChapterState = {
	status: "idle",
	chapters: [],
	error: null,
};

const SelectStudyChapter = ({ selectedStudyId, gameDispatch }: IProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	const { getLichessStudyChapters, loadLichessStudyChapter } = useLichess();

	const [chapterState, fetchChaptersAction, isPending] = useActionState(
		async (_prev: ChapterState, _formData: FormData): Promise<ChapterState> => {
			if (!selectedStudyId) {
				return {
					status: "error",
					chapters: [],
					error: "No study selected.",
				} satisfies ChapterState;
			}
			try {
				const studies = await getLichessStudyChapters({
					studyId: selectedStudyId,
				});
				if (!studies) {
					return {
						status: "error",
						chapters: [],
						error: "No chapters found.",
					} satisfies ChapterState;
				}
				return {
					status: "success",
					chapters: studies,
					error: null,
				} satisfies ChapterState;
			} catch (err) {
				return {
					status: "error",
					chapters: [],
					error:
						err instanceof Error ? err.message : "Failed to load chapters.",
				} satisfies ChapterState;
			}
		},
		initialChapterState,
	);

	const filteredChapters = chapterState.chapters.filter((chapter) =>
		chapter.name.toLowerCase().includes(search.toLowerCase()),
	);

	useClickOutside({ isOpen, setIsOpen, setSearch, ref: dropdownRef });

	useEffect(() => {
		if (
			isPending ||
			chapterState.status === "success" ||
			chapterState.status === "error"
		) {
			setIsOpen(true);
		}
	}, [isPending, chapterState.status]);

	useEffect(() => {
		if (chapterState.status === "error" && chapterState.error) {
			toast.error(chapterState.error, { toastId: "chapters-fetch-error" });
		}
	}, [chapterState]);

	const handleChapterClick = async (chapter: IUserStudyChapter) => {
		const { headers, pgn } = await loadLichessStudyChapter({ chapter });

		gameDispatch({ type: "SET_GAME", payload: { pgn, headers } });

		setIsOpen(false);
		setSearch("");
	};

	return (
		<form
			key={selectedStudyId}
			action={fetchChaptersAction}
			className="relative"
		>
			<input type="hidden" name="studyId" value={selectedStudyId} />
			<button
				type="submit"
				className="btn btn-secondary"
				disabled={!selectedStudyId || isPending}
			>
				{isPending ? "Loading chapters…" : "Import Chapter"}
			</button>

			{isOpen ? (
				<div className="absolute z-3 bg-(--bg-base) mt-2 max-h-80 border border-(--neutral-content)/30 rounded-lg p-3 overflow-y-scroll transition-all duration-300 ease-in-out opacity-100 scale-100 shadow-lg">
					<div className="relative">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--neutral-content) pointer-events-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>search</title>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.3-4.3" />
							</svg>
						</span>
						<input
							type="text"
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full h-12 pl-10 pr-4 rounded-lg border border-(--neutral-content) text-(--base-content) placeholder-(--neutral-content)/50 outline-hidden transition-all duration-200 focus:border-(--accent) focus:outline-3 focus:outline-offset-2 focus:outline-(--accent)/50"
						/>
					</div>

					<hr className="border-(--neutral-content)/15 my-2" />

					{isPending ? (
						<p className="text-(--neutral-content) text-sm text-center py-4">
							Loading chapters…
						</p>
					) : filteredChapters.length > 0 ? (
						<ul>
							{filteredChapters.map((chapter) => (
								<li key={`${chapter.chapterId}${chapter.name}`}>
									<button
										type="button"
										className="p-2 cursor-pointer hover:bg-(--neutral-content)/15 focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-2 rounded text-left w-full transition-colors duration-200"
										onClick={() => handleChapterClick(chapter)}
									>
										{chapter.name}
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className="text-(--neutral-content) text-sm text-center py-4">
							No results found
						</p>
					)}
				</div>
			) : null}
		</form>
	);
};

export default SelectStudyChapter;
