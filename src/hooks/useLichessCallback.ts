import { useEffect } from "react";
import { useLichess } from "#/hooks/useLichess.ts";

interface IProps {
	code: string;
}

export const useLichessCallback = ({ code }: IProps) => {
	const { lichessTokenVerification } = useLichess();

	useEffect(() => {
		if (!code) return;

		const response = lichessTokenVerification({ code });
		console.log("Response:", response);
	}, [code, lichessTokenVerification]);
};
