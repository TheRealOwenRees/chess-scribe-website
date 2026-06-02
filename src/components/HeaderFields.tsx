import FormField from "#/components/FormField.tsx";
import type { IHeader } from "#/interfaces.ts";

interface IProps {
	headers: IHeader;
}

const HeaderFields = ({ headers }: IProps) => {
	console.log(headers);

	return (
		<div className="my-4 w-full">
			<details className="bg-(--neutral-content)/20 p-4 rounded-lg">
				<summary>
					Headers
					<p className="text-sm font-normal">Edit the game PGN headers</p>
				</summary>
				<div>
					<form className="grid place-items-center gap-4 sm:grid-cols-2 mt-2">
						<FormField fieldName="event" type="text" headers={headers} />
						<FormField fieldName="site" type="text" headers={headers} />
						<FormField fieldName="date" type="text" headers={headers} />
						<FormField fieldName="round" type="text" headers={headers} />
						<FormField fieldName="white" type="text" headers={headers} />
						<FormField fieldName="black" type="text" headers={headers} />
						<FormField fieldName="result" type="text" headers={headers} />
						<FormField fieldName="eco" type="text" headers={headers} />
						<FormField fieldName="whiteElo" type="text" headers={headers} />
						<FormField fieldName="blackElo" type="text" headers={headers} />
						<FormField fieldName="plyCount" type="text" headers={headers} />
						<FormField fieldName="eventDate" type="text" headers={headers} />
						<FormField fieldName="source" type="text" headers={headers} />
					</form>
				</div>
			</details>
		</div>
	);
};

export default HeaderFields;
