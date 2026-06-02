import type { ChangeEvent } from "react";
import type { IHeader } from "#/interfaces.ts";

export interface IFormField {
	fieldName: string;
	type: string;
	headers: IHeader;
	updateHeaders: (e: ChangeEvent<HTMLInputElement>, fieldName: string) => void;
}

const FormField = ({ fieldName, type, headers, updateHeaders }: IFormField) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={fieldName} className="text-sm capitalize">
				{fieldName}
			</label>
			<input
				className="headers__input"
				type={type}
				id={fieldName}
				name={fieldName}
				value={headers[fieldName]}
				onChange={(e) => updateHeaders(e, fieldName)}
			/>
		</div>
	);
};

export default FormField;
