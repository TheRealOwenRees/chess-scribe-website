import { useEffect } from "react";
import { toast } from "react-toastify";

interface IProps {
	state: {
		success: boolean;
		message: string;
	} | null;
}

export const useToastStateChange = ({ state }: IProps) => {
	useEffect(() => {
		if (!state) return;

		if (state.success) {
			toast.success(state.message);
		} else {
			toast.error(state.message);
		}
	}, [state]);
};
