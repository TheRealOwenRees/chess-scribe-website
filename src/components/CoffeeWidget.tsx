import { Image } from "@unpic/react";
import buyMeACoffeeLogo from "@/assets/images/buymeacoffeelogo.svg?url";

interface IProps {
	height: number;
	width: number;
}

const CoffeeWidget = ({ height, width }: IProps) => {
	return (
		<a
			href="https://buymeacoffee.com/owenreesdev"
			target="_blank"
			className="ml-auto flex items-center gap-2 text-sm"
			rel="noopener"
		>
			<Image
				src={buyMeACoffeeLogo}
				alt="Buy Me A Coffee Logo"
				width={width}
				height={height}
			/>
			<p>Support This Project</p>
		</a>
	);
};

export default CoffeeWidget;
