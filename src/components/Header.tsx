import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { z } from "zod";
import MaintenanceModeBanner from "#/components/MaintenanceModeBanner.tsx";
import { env } from "#/env.ts";
import logo from "@/assets/images/logo.svg?url";

export default function Header() {
	const maintenanceModeMessage = env.VITE_MAINTENANCE_MODE
		? z
				.string()
				.transform((value) => (value.trim() === "" ? null : value))
				.parse(env.VITE_MAINTENANCE_MODE_MESSAGE)
		: null;

	return (
		<header>
			{maintenanceModeMessage ? (
				<div className="absolute w-full">
					<MaintenanceModeBanner message={maintenanceModeMessage} />
				</div>
			) : null}

			<nav className="w-full max-w-screen-2xl place-self-center p-8">
				<div className="container mx-auto flex items-center justify-between">
					<div className="flex items-center">
						<Link to="/" className="flex flex-row items-center justify-center">
							<Image
								src={logo}
								alt="ChessScribe Logo"
								width={50}
								height={50}
								className="mr-4"
							/>
							<span className="nav-title hidden text-2xl font-extrabold sm:block">
								ChessScribe
							</span>
						</Link>
					</div>

					<div>
						<ul className="flex flex-1 items-center gap-14 font-semibold">
							<li>
								<Link to="/chessboard" className="nav-item">
									Chessboard
								</Link>
							</li>

							<li>
								<Link to="/contact" className="nav-item">
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}
