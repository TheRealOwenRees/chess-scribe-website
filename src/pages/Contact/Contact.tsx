import { useActionState } from "react";
import { LuSend } from "react-icons/lu";
import Section from "#/components/Section.tsx";
import { useToastStateChange } from "#/hooks/useToastStateChange.ts";

interface IFormField {
	fieldName: string;
	type: "text" | "email" | "textarea";
	placeholder: string;
	required?: boolean;
	textarea?: boolean;
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
	required = false,
	textarea = false,
}: IFormField) => (
	<div className="flex flex-col gap-2">
		<label
			htmlFor={fieldName}
			className="capitalize text-(--neutral-content) text-left"
		>
			{fieldName}
			{required && <span>*</span>}
		</label>
		{textarea ? (
			<textarea
				id={fieldName}
				name={fieldName}
				placeholder={placeholder}
				required={required}
				rows={5}
				className="text-(--base-content) w-full rounded-md border border-neutral-300 px-3 py-2 placeholder:text-neutral-400/50 outline-hidden transition-all duration-200 focus:border-(--accent) focus:outline-3 focus:outline-offset-2 focus:outline-(--accent)/50 resize-y"
			/>
		) : (
			<input
				type={type}
				id={fieldName}
				name={fieldName}
				placeholder={placeholder}
				required={required}
				className="text-(--base-content) w-full rounded-md border border-neutral-300 px-3 py-2 placeholder:text-neutral-400/50 outline-hidden transition-all duration-200 focus:border-(--accent) focus:outline-3 focus:outline-offset-2 focus:outline-(--accent)/50"
			/>
		)}
	</div>
);

const Contact = ({ handleSubmit }: IProps) => {
	const [state, formAction, isPending] = useActionState(handleSubmit, null);
	useToastStateChange({ state });

	return (
		<main className="px-4 pb-8 place-self-center min-h-[calc(100vh-226px)]">
			<Section
				title="Contact Us"
				description="Do you have suggestions on how to improve this service? Would you like to get involved with this project? Ask us anything you like."
			>
				<form
					action={formAction}
					className="col-span-full max-w-150 flex flex-col gap-6 w-full"
				>
					<FormField
						type="text"
						fieldName="name"
						placeholder="Your name"
						required
					/>

					<FormField
						fieldName="email"
						type="email"
						placeholder="name@example.com"
						required
					/>

					<FormField
						fieldName="subject"
						type="text"
						placeholder="Reason for contacting us"
					/>

					<FormField
						fieldName="message"
						type="text"
						placeholder="Your message here..."
						required
						textarea
					/>

					<button
						type="submit"
						disabled={isPending}
						className="btn btn-primary flex items-center justify-center gap-2 w-full"
					>
						{isPending ? "Sending..." : "Send"}
						<LuSend className="w-5 h-5" />
					</button>
					{/*{state && <p>{state.message}</p>}*/}
				</form>
			</Section>
		</main>
	);
};

export default Contact;
