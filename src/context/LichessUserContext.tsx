import { useServerFn } from "@tanstack/react-start";

import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";

import { getSession } from "#/server/lichess.ts";

interface ILichessUser {
	username: string;
	id: string;
}

interface ILichessUserContextType {
	user: ILichessUser | null;
	setUser: Dispatch<SetStateAction<ILichessUser | null>>;
}

const LichessUserContext = createContext<ILichessUserContextType | undefined>(
	undefined,
);

export const LichessUserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<ILichessUser | null>(null);
	const getSessionFn = useServerFn(getSession);

	useEffect(() => {
		(async () => {
			const session = await getSessionFn();
			if (session) {
				setUser({
					username: session.username,
					id: session.id,
				});
			}
		})();
	}, [getSessionFn]);

	return (
		<LichessUserContext.Provider value={{ user, setUser }}>
			{children}
		</LichessUserContext.Provider>
	);
};

export const useLichessUser = () => {
	const context = useContext(LichessUserContext);
	if (!context) {
		throw new Error("useLichessUser must be used within a LichessUserProvider");
	}
	return context;
};
