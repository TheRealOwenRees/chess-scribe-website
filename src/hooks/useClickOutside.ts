import { type RefObject, useEffect } from "react";

interface IProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	ref: RefObject<HTMLDivElement | null>;
	setSearch: (search: string) => void;
}

export const useClickOutside = ({
	isOpen,
	setIsOpen,
	setSearch,
	ref,
}: IProps) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				ref.current &&
				!ref.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setSearch("");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, setIsOpen, setSearch, ref]);
};
