import type { ReactNode } from "react";

interface IProps {
	title: string;
	children?: ReactNode;
}

const Feature = ({ title, children }: IProps) => (
	<div className="mb-auto">
		<h6 className="text-(--neutral-content) text-2xl font-bold">{title}</h6>
		<p className="text-(--neutral-content) font-medium" data-testid="text">
			{children}
		</p>
	</div>
);

export default Feature;
