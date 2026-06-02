import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import AccordionItem from "#/components/AccordionItem.tsx";
import Feature from "#/components/Feature.tsx";
import Section from "#/components/Section.tsx";
import examplePdf1 from "@/assets/images/examplepdf1.webp?url";
import examplePdf2 from "@/assets/images/examplepdf2.webp?url";

const Home = () => (
	<main className="px-4 pb-8 pt-14">
		<section
			id="hero"
			className="grid max-w-screen-2xl items-center gap-8 p-8 text-center md:grid-cols-2 md:text-left mx-auto"
		>
			<div>
				<h1 className="text-3xl font-bold text-base-content md:text-4xl">
					Convert your Chess PGN
				</h1>
				<h1 className="text-3xl font-bold text-base-content md:text-4xl">
					into a <span className="text-(--accent)">Publishable PDF.</span>
				</h1>
				<h2 className="mb-8 mt-4 text-(--base-content)">
					Upload and convert your games into a book format, along with variation
					and annotations.
				</h2>
				<Link to="/chessboard" className="btn btn-primary btn-large">
					Get Started
				</Link>
			</div>
			<div className="example-pdfs">
				<Image src={examplePdf2} alt="Example PDF 2" width={500} height={500} />
				<Image
					src={examplePdf1}
					alt="Example PDF 1"
					width={500}
					height={500}
					priority
				/>
			</div>
		</section>
		<Section
			title="A Unique Chess Publication Service"
			smallTitle="FEATURES"
			description="Convert your chess PGN files into a publishable PDF, complete with diagrams of chosen positions."
		>
			<Feature title="Fast">
				Quick PDF generation using a custom TeX Live server.
			</Feature>

			<Feature title="Easy">
				Upload a PGN of your game, and choose the diagrams you want in your PDF.
				Annotations are added automatically.
			</Feature>

			<Feature title="Reliable">
				Dedicated servers ensure that downtime is kept to a minimum.
			</Feature>
		</Section>

		<Section
			title="Your Questions Answered"
			smallTitle="FAQs"
			description="Below we answer some of the most common questions we get regarding this service."
		>
			<div className="hero__accordion-container">
				<AccordionItem title="Is this service free?" id="accordion-1">
					Yes. There are no current plans to charge for this service. If in the
					future there is a payment plan, it will come with a generous free
					tier.
				</AccordionItem>

				<AccordionItem
					title="Will you be adding more features?"
					id="accordion-2"
				>
					We have a lot more features to implement in the near future. If you
					have a feature that you would like to see implemented, please feel
					free to send us a message via our contact form.
				</AccordionItem>

				<AccordionItem
					title="Do you hold any copyright on the produced materials?"
					id="accordion-3"
				>
					No. We will never implement any terms whereby we have any interest in
					the materials created with this service.
				</AccordionItem>
			</div>
		</Section>
	</main>
);

export default Home;
