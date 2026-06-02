import FormField from "#/components/FormField.tsx";

const HeaderFields = () => {
	return (
		<div className="my-4 w-full">
			<details className="bg-(--neutral-content)/20 p-4 rounded-lg">
				<summary>
					Headers
					<p className="text-sm font-normal">Edit the game PGN headers</p>
				</summary>
				<div>
					<form className="grid place-items-center gap-4 sm:grid-cols-2 mt-2">
						<FormField fieldName="event" type="text" />
						<FormField fieldName="site" type="text" />
						<FormField fieldName="date" type="text" />
						<FormField fieldName="round" type="text" />
						<FormField fieldName="white" type="text" />
						<FormField fieldName="black" type="text" />
						<FormField fieldName="result" type="text" />
						<FormField fieldName="eco" type="text" />
						<FormField fieldName="whiteElo" type="text" />
						<FormField fieldName="blackElo" type="text" />
						<FormField fieldName="plyCount" type="text" />
						<FormField fieldName="eventDate" type="text" />
						<FormField fieldName="source" type="text" />
					</form>
				</div>
			</details>
		</div>
	);
};

export default HeaderFields;
