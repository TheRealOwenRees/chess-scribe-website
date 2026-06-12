import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";

import { LuGithub, LuMail } from "react-icons/lu";

import CoffeeWidget from "#/components/CoffeeWidget.tsx";
import { GITHUB_URL } from "#/config.ts";
import footerLogo from "@/assets/images/footerLogo.svg?url";

export default function Footer() {
	return (
		<footer className="text-white w-full grid-cols-2 items-center bg-(--accent) px-10 py-5">
			<div className="flex w-full items-center gap-2">
				<Link to="/" aria-label="Home">
					<Image
						src={footerLogo}
						alt="ChessScribe Logo"
						width={10}
						height={10}
						className="hidden h-10 w-10 sm:block"
						aria-label="ChessScribe Logo"
					/>
				</Link>
				<div>
					<p>© 2023 - {new Date().getFullYear()}</p>
				</div>
				<div className="ml-auto flex gap-2">
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						className="text-2xl hover:text-(--neutral-content) transition-colors duration-300 ease-in-out cursor-pointer"
					>
						<LuGithub />
					</a>

					<Link
						to="/contact"
						rel="noopener noreferrer"
						aria-label="Contact"
						className="text-2xl hover:text-(--neutral-content) transition-colors duration-300 ease-in-out"
					>
						<LuMail />
					</Link>
				</div>
				<CoffeeWidget width={20} height={50} />
			</div>
		</footer>
	);
}
