interface IProps {
	message?: string;
}

const DEFAULT_MESSAGE = "Maintenance Mode";

const MaintenanceModeBanner = ({ message }: IProps) => (
	<div className="bg-orange-400 text-white text-center py-1 w-full text-sm">
		<p>{message || DEFAULT_MESSAGE}</p>
	</div>
);

export default MaintenanceModeBanner;
