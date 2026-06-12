import { Link } from "@tanstack/react-router";

const NotFoundView = () => {
	return (
		<div className="flex min-h-[calc(100vh-194px)] flex-col items-center justify-center p-6">
			<div className="relative flex max-w-md flex-col items-center text-center">
				<h1 className="text-2xl font-bold tracking-tight mb-4 text-(--accent)">
					The page you are looking for does not exist.
				</h1>

				<div className="flex w-full gap-3 justify-center">
					<Link to="/" className="btn btn-primary">
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFoundView;
