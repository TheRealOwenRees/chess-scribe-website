import type { ChangeEvent } from "react";
import FormField from "#/components/FormField.tsx";
import type { IHeader } from "#/interfaces.ts";

interface IProps {
	headers: IHeader;
	updateHeaders: (e: ChangeEvent<HTMLInputElement>, fieldName: string) => void;
}

const HeaderFields = ({ headers, updateHeaders }: IProps) => {
	return (
		<div className="mt-4 w-full">
			<details className="bg-(--neutral-content)/15 p-4 rounded-lg">
				<summary>
					Headers
					<p className="text-sm font-normal">Edit the game PGN headers</p>
				</summary>
				<div>
					<form className="grid place-items-center gap-4 sm:grid-cols-2 mt-2">
						<FormField
							fieldName="event"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="site"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="date"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="round"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="white"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="black"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="result"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="eco"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="whiteElo"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="blackElo"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="plyCount"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="eventDate"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="source"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
					</form>
				</div>
			</details>
		</div>
	);
};

export default HeaderFields;
