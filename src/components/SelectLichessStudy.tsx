import { useRef, useState } from "react";
import { useClickOutside } from "#/hooks/useClickOutside.ts";
import { type IUserStudyChapter, useLichess } from "#/hooks/useLichess.ts";

interface IProps {
	setSelectedStudyId: (studyId: string) => void;
	setStudyChapters: (chapters: IUserStudyChapter[]) => void;
}

const SelectLichessStudy = ({ setSelectedStudyId }: IProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const { getLichessUserStudies, userStudies } = useLichess();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const filteredStudies = userStudies.filter((study) =>
		study.name.toLowerCase().includes(search.toLowerCase()),
	);

	const onClickHandler = async () => {
		setIsOpen(!isOpen);

		if (!userStudies.length) {
			await getLichessUserStudies();
		}
	};

	const handleStudyClick = async (studyId: string) => {
		setSelectedStudyId(studyId);
		setIsOpen(false);
		setSearch("");
	};

	useClickOutside({ isOpen, setIsOpen, setSearch, ref: dropdownRef });

	return (
		<div ref={dropdownRef} className="relative">
			<button
				type="button"
				className="btn btn-secondary"
				onClick={onClickHandler}
			>
				Select Lichess Study
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

					{filteredStudies.length > 0 ? (
						<ul>
							{filteredStudies.map((study) => (
								<li key={study.id}>
									<button
										type="button"
										className="p-2 cursor-pointer hover:bg-(--neutral-content)/15 focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-2 rounded text-left w-full transition-colors duration-200"
										onClick={() => handleStudyClick(study.id)}
									>
										{study.name}
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
		</div>
	);
};

export default SelectLichessStudy;
