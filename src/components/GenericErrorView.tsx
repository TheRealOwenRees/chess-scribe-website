import { useNavigate, useRouter } from "@tanstack/react-router";

interface GenericErrorViewProps {
	error?: Error | unknown;
	resetErrorBoundary?: () => void;
}

const GenericErrorView = ({
	error,
	resetErrorBoundary,
}: GenericErrorViewProps) => {
	const router = useRouter();
	const navigate = useNavigate();

	const errorMessage =
		error instanceof Error
			? error.message
			: "An unexpected system error occurred.";

	const handleTryAgain = async () => {
		if (resetErrorBoundary) {
			resetErrorBoundary();
		}

		await router.invalidate();
		const currentSearch = router.state.location.search;
		await navigate({ to: ".", search: currentSearch });
	};

	return (
		<div className="flex min-h-[calc(100vh-194px)] flex-col items-center justify-center p-6">
			<div className="relative flex max-w-md flex-col items-center text-center">
				<h1 className="text-2xl font-bold tracking-tight mb-2 text-(--accent)">
					Something went wrong
				</h1>
				<p className="text-sm text-(--neutral-content) mb-6 max-w-sm">
					The application encountered an issue it couldn't recover from.
				</p>

				<div className="w-full mb-8 rounded-md bg-slate-300/60 border border-slate-800/80 p-4 text-left font-mono text-xs text-red-400 max-h-32 overflow-y-auto">
					<span className="text-(--base-content) block mb-1">Error Logs:</span>
					{errorMessage}
				</div>

				<div className="flex w-full gap-3 justify-center">
					{resetErrorBoundary && (
						<button
							type="button"
							onClick={handleTryAgain}
							className="btn btn-secondary"
						>
							Try Again
						</button>
					)}
					<button
						type="button"
						onClick={() => navigate({ to: "/" })}
						className="btn btn-primary"
					>
						Go Home
					</button>
				</div>
			</div>
		</div>
	);
};

export default GenericErrorView;
