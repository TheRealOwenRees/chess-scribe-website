import { useEffect, useRef, useState } from "react";
import { type IUserStudyChapter, useLichess } from "#/hooks/useLichess.ts";

interface IProps {
	setSelectedStudyId: (studyId: string) => void;
	setStudyChapters: (chapters: IUserStudyChapter[]) => void;
}

const SelectLichessStudy = ({ setSelectedStudyId }: IProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { getLichessUserStudies, userStudies } = useLichess();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const onClickHandler = async () => {
		setIsOpen(!isOpen);

		if (!userStudies.length) {
			await getLichessUserStudies();
		}
	};

	const handleStudyClick = async (studyId: string) => {
		setSelectedStudyId(studyId);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

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
				<div className="absolute z-3 bg-(--bg-base) mt-2 max-h-75 border rounded-lg p-2 overflow-y-scroll">
					<input type="text" placeholder="Search..." />
					<ul>
						{userStudies.map((study) => (
							<li key={study.id}>
								<button
									type="button"
									className="p-2 cursor-pointer hover:bg-(--neutral-content)/20 text-left w-full"
									onClick={() => handleStudyClick(study.id)}
								>
									{study.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
};

export default SelectLichessStudy;
