import { useActionState } from "react";
import Section from "#/components/Section.tsx";

interface IFormField {
	fieldName: string;
	type: "text" | "email" | "textarea";
	placeholder: string;
	label: string;
	required: boolean;
}

type IProps = {
	handleSubmit: (
		prevState: unknown,
		formData: FormData,
	) => Promise<{ success: boolean; message: string }>;
};

const FormField = ({
	type,
	fieldName,
	placeholder,
	label,
	required,
}: IFormField) => (
	<div className="flex flex-col gap-2">
		<label htmlFor={fieldName}>{label}</label>
		<input
			type={type}
			id={fieldName}
			name={fieldName}
			placeholder={placeholder}
			required={required}
		/>
	</div>
);

const Contact = ({ handleSubmit }: IProps) => {
	const [state, formAction, isPending] = useActionState(handleSubmit, null);

	return (
		<main className="px-4 pb-8 place-self-center min-h-[calc(100vh-226px)]">
			<Section
				title="Contact Us"
				description="Do you have suggestions on how to improve this service? Would you like to get involved with this project? Ask us anything you like."
			>
				<form action={formAction}>
					<FormField
						type="text"
						fieldName="name"
						placeholder="Your name"
						label="Name"
						required
					/>

					<FormField
						fieldName="email"
						type="text"
						placeholder="name@example.com"
						label="Email"
						required
					/>

					<input
						type="text"
						name="subject"
						placeholder="Reason for contacting us"
					/>

					<textarea
						name="message"
						placeholder="Your message here..."
						required
					/>

					<button
						type="submit"
						disabled={isPending}
						className="btn btn-primary"
					>
						{isPending ? "Sending..." : "Send"}
					</button>
					{state && <p>{state.message}</p>}
				</form>
			</Section>
		</main>
	);
};

export default Contact;
