export interface IFormField {
	fieldName: string;
	type: string;
}

const FormField = ({ fieldName, type }: IFormField) => {
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
			/>
		</div>
	);
};

export default FormField;
