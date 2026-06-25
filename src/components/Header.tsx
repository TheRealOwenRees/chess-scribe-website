import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import MaintenanceModeBanner from "#/components/MaintenanceModeBanner.tsx";
import { env } from "#/env.ts";
import logo from "@/assets/images/logo.svg?url";

export default function Header() {
	return (
		<header>
			{env.VITE_MAINTENANCE_MODE ? (
				<div className="absolute w-full">
					<MaintenanceModeBanner message={env.VITE_MAINTENANCE_MODE_MESSAGE} />
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
