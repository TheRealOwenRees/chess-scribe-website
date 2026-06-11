interface IProps {
	title?: string;
	description?: string;
}

const LoadingView = ({ title, description }: IProps) => {
	return (
		<div className="flex min-h-[calc(100vh-194px)] flex-col items-center justify-center p-6 bg-base-100">
			<div className="relative flex max-w-sm flex-col items-center text-center">
				{/* Animated Custom Loader */}
				<div className="relative mb-6 flex h-16 w-16 items-center justify-center">
					{/* Outer Pulsing Ring */}
					<div className="absolute inset-0 animate-ping rounded-full bg-(--accent) opacity-20 [animation-duration:1.5s]"></div>

					{/* Inner Spinning Ring */}
					<div className="h-12 w-12 animate-spin rounded-full border-4 border-(--accent) border-t-transparent"></div>
				</div>

				{/* Loading Content */}
				<h2 className="text-xl font-bold tracking-tight mb-2 text-(--base-content)">
					{title || "Loading Data"}
				</h2>
				<p className="text-sm text-(--neutral-content) max-w-xs">
					{description || "Please wait a moment while we load the data."}
				</p>

				{/* Decorative background glow matching your layout */}
				<div className="absolute -inset-10 -z-10 bg-(--accent)/5 blur-2xl rounded-full pointer-events-none" />
			</div>
		</div>
	);
};

export default LoadingView;
