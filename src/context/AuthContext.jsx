import { createContext, useContext } from "react";
import { useAuthFirebase } from "../hooks/useAuthFirebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const { authState: { user, isLoading }, ...rest } = useAuthFirebase();

	return (
		<AuthContext.Provider value={{ user, isLoading, ...rest}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
