import { useChessGame } from "#/hooks/useChessGame.ts";
import type { IHeader } from "#/interfaces.ts";

export interface IFormField {
	fieldName: string;
	type: string;
	headers: IHeader;
}

const FormField = ({ fieldName, type, headers }: IFormField) => {
	const { updateHeaders } = useChessGame();

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
