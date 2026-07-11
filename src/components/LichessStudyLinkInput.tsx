import type { FormEvent } from "react";
import { toast } from "react-toastify";
import { useLichess } from "#/hooks/useLichess.ts";

interface IProps {
	setSelectedStudyId: (id: string) => void;
}

const LichessStudyLinkInput = ({ setSelectedStudyId }: IProps) => {
	const { parseLichessStudyLink } = useLichess();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const studyLink = formData.get("lichess-study-link");

		if (!studyLink) return;

		if (typeof studyLink !== "string") {
			toast.error("Invalid study link");
			return;
		}

		const result = parseLichessStudyLink(studyLink);

		if (!result.ok) {
			toast.error(result.error);
			return;
		}

		console.log(result.data);

		setSelectedStudyId(result.data);
		toast.success("Study loaded — pick a chapter");
	};

	return (
		<form className="flex items-end gap-2" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="lichess-study-link" className="text-sm capitalize">
					Lichess Study Link
				</label>
				<input
					className="border rounded-md p-2 w-full"
					type="text"
					id="lichess-study-link"
					name="lichess-study-link"
					placeholder="https://lichess.org/study/..."
				/>
			</div>
			<button
				type="submit"
				className="border py-2 px-3 rounded-md cursor-pointer bg-(--accent) text-white hover:bg-transparent hover:text-(--accent) transition-colors duration-300 ease-in-out"
			>
				Submit
			</button>
		</form>
	);
};

export default LichessStudyLinkInput;
