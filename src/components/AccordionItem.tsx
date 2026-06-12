import type { ReactNode } from "react";

interface IProps {
	children: ReactNode;
	title: string;
	id: string;
}

const AccordionItem = ({ title, id, children }: IProps) => (
	<div className="hero__accordion-item">
		<details className="hero__accordion-details" name="linked">
			<summary className="hero__accordion-item__summary" id={`${id}-summary`}>
				<span className="hero__accordion-item__title-container">
					<span className="hero__accordion-item__title">{title}</span>
				</span>
			</summary>
		</details>

		<div className="hero__accordion-item__content">
			<p
				className="hero__accordion-item__content__inner"
				role="definition"
				id={id}
			>
				{children}
			</p>
		</div>
	</div>
);

export default AccordionItem;
