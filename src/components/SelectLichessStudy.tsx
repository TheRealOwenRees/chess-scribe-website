import { useLichess } from "#/hooks/useLichess.ts";

const SelectLichessStudy = () => {
	const { getLichessUserStudies } = useLichess();

	const onClickHandler = async () => {
		await getLichessUserStudies();
	};

	return (
		<button
			type="button"
			className="btn btn-secondary"
			onClick={onClickHandler}
		>
			Select Lichess Study
		</button>
	);
};

export default SelectLichessStudy;
