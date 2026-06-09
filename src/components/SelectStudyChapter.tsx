import { useRef, useState, type Dispatch } from "react";
import { type IUserStudyChapter, useLichess } from "#/hooks/useLichess.ts";
import type { GameAction } from "#/reducers/gameReducer.ts";

interface IProps {
	selectedStudyId: string;
	gameDispatch: Dispatch<GameAction>;
}

const SelectStudyChapter = ({ selectedStudyId, gameDispatch }: IProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [studyChapters, setStudyChapters] = useState<IUserStudyChapter[]>([]);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const { getLichessStudyChapters, loadLichessStudyChapter } = useLichess();

	const onClickHandler = async () => {
		const studies = await getLichessStudyChapters({ studyId: selectedStudyId });
		if (!studies) return;
		setStudyChapters(studies);
		setIsOpen(!isOpen);
	};

	const handleChapterClick = async (chapter: IUserStudyChapter) => {
		const { headers, pgn } = await loadLichessStudyChapter({ chapter });

		gameDispatch({ type: "SET_GAME", payload: { pgn, headers } });

		setIsOpen(false);
	};

	return (
		<div ref={dropdownRef} className="relative">
			<button
				type="button"
				className="btn btn-secondary"
				onClick={onClickHandler}
			>
				Import Study Chapter/Game
			</button>

			{isOpen ? (
				<div className="absolute z-3 bg-(--bg-base) mt-2 max-h-75 border rounded-lg p-2 overflow-y-scroll">
					<input type="text" placeholder="Search..." />
					<ul>
						{studyChapters?.map((chapter) => (
							<li key={`${chapter.chapterId}${chapter.name}`}>
								<button
									type="button"
									className="p-2 cursor-pointer hover:bg-(--neutral-content)/20 text-left w-full"
									onClick={() => handleChapterClick(chapter)}
								>
									{chapter.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
};

export default SelectStudyChapter;
