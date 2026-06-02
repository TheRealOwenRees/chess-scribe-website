import type { ChangeEvent } from "react";
import FormField from "#/components/FormField.tsx";
import type { IHeader } from "#/interfaces.ts";

interface IProps {
	headers: IHeader;
	updateHeaders: (e: ChangeEvent<HTMLInputElement>, fieldName: string) => void;
}

const CustomHeaders = ({ headers, updateHeaders }: IProps) => {
	return (
		<div className="mt-4 w-full">
			<details className="bg-(--neutral-content)/20 p-4 rounded-lg">
				<summary>
					Custom Headers (PDF)
					<p className="text-sm font-normal">
						Text in these fields will overwrite the PGN headers in the generated
						PDF
					</p>
				</summary>
				<div>
					<form className="grid place-items-center gap-4 sm:grid-cols-2 mt-2">
						<FormField
							fieldName="title"
							type="text"
							headers={headers}
							updateHeaders={updateHeaders}
						/>
						<FormField
							fieldName="subtitle"
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
							fieldName="author"
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

export default CustomHeaders;
