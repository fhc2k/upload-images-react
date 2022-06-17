import { AppContextProvider } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const DashboardPage = () => (
	<AppContextProvider>
		<Navbar />
		<Outlet />
	</AppContextProvider>
);
