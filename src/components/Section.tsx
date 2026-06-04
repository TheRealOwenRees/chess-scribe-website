import type { ReactNode } from "react";

interface IProps {
	title: string;
	smallTitle?: string;
	description?: string;
	children: ReactNode;
}

const Section = ({ title, smallTitle, description, children }: IProps) => {
	const words = title.trim().split(" ");
	const lastWord = words.pop();
	const mainTitle = words.join(" ");

	return (
		<section className="mx-auto mt-8 grid max-w-5xl place-items-center gap-4 p-8 text-center md:grid-cols-3 md:text-left text-(--accent)">
			<h3 className="col-span-full mb-4 text-center text-lg font-bold tracking-wider text-primary">
				{smallTitle}
			</h3>
			<h4 className="col-span-full mb-4 text-center text-4xl font-extrabold text-(--neutral-content) md:text-5xl">
				{mainTitle} <span className="text-(--accent)">{lastWord}</span>
			</h4>
			<p className="col-span-full mb-8 w-1/2 text-center font-semibold text-(--neutral-content) ">
				{description}
			</p>
			{children}
		</section>
	);
};

export default Section;
