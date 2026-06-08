import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";

interface ILichessUser {
	username: string;
	id: string;
	isLoggedIn: boolean;
}

interface ILichessUserContextType {
	user: ILichessUser | null;
	setUser: Dispatch<SetStateAction<ILichessUser | null>>
}

const LichessUserContext = createContext<ILichessUserContextType | undefined>(
	undefined,
);

export const LichessUserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<ILichessUser | null>(null);

	// TODO useEffect to check and login user on mount

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
