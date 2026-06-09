import { useState } from "react";
import { useLichess } from "#/hooks/useLichess.ts";

const parseStudyId = (url: string): string | null => {
	const match = url.match(
		/(?:https?:\/\/)?(?:www\.)?lichess\.org\/study\/([a-zA-Z0-9]+)/,
	);
	return match?.[1] ?? null;
};

const LichessStudyUrlInput = () => {
	const [url, setUrl] = useState("");
	const [feedback, setFeedback] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const { setSelectedStudyId, selectedStudyId } = useLichess();

	const handleSubmit = () => {
		if (!url.trim()) {
			setFeedback({ type: "error", message: "Please enter a study URL" });
			return;
		}

		const studyId = parseStudyId(url.trim());

		if (!studyId) {
			setFeedback({
				type: "error",
				message: "Invalid Lichess study URL",
			});
			return;
		}

		if (studyId === selectedStudyId) {
			setFeedback({
				type: "success",
				message: "Study already selected",
			});
			return;
		}

		setSelectedStudyId(studyId);
		setFeedback({ type: "success", message: "Study loaded — pick a chapter" });
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") handleSubmit();
	};

	return (
		<div className="flex items-center gap-2 min-w-[500px]">
			<div className="relative flex-1">
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
						aria-hidden="true"
					>
						<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
						<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
					</svg>
				</span>
				<input
					type="url"
					placeholder="Lichess Study URL"
					value={url}
					onChange={(e) => {
						setUrl(e.target.value);
						if (feedback) setFeedback(null);
					}}
					onKeyDown={handleKeyDown}
					className={`w-full h-12 pl-10 pr-4 rounded-lg border text-(--base-content) placeholder-(--neutral-content)/50 outline-hidden transition-all duration-200 focus:border-(--accent) focus:outline-3 focus:outline-offset-2 focus:outline-(--accent)/50 ${
						feedback?.type === "error"
							? "border-red-500"
							: "border-(--neutral-content)"
					}`}
				/>
			</div>

			<button
				type="button"
				className="btn btn-secondary px-6 whitespace-nowrap"
				onClick={handleSubmit}
			>
				Load Study
			</button>

			{feedback ? (
				<span
					className={`text-sm whitespace-nowrap ${
						feedback.type === "error" ? "text-red-500" : "text-(--accent)"
					}`}
				>
					{feedback.message}
				</span>
			) : null}
		</div>
	);
};

export default LichessStudyUrlInput;
