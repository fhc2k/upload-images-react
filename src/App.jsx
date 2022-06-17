import { Toaster } from "react-hot-toast";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { MyFilesPage } from "./pages/MyFilesPage";
import { UploadPage } from "./pages/UploadPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AccountPage } from "./pages/AccountPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { VerifiEmailPage } from "./pages/VerifyEmailPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { AppContextProvider } from "./context/AppContext";
import { Ring } from "@uiball/loaders";

const App = () => {
	const { user, isLoading } = useAuthContext();

	const RequireAuth = ({ children }) =>
		user ? children : <Navigate replace to="/login" />;

	const RedirectAuth = ({ children }) =>
		user ? <Navigate replace to="/files" /> : children;

	const RequireEmailVerified = ({ children }) =>
		user.emailVerified ? children : <Navigate replace to="/verify-email" />;

	const RedirectEmailVerified = ({ children }) =>
		user.emailVerified ? <Navigate replace to="/files" /> : children;

	if (isLoading) {
		return (
			<div className="main__container">
				<section className="w-full h-screen grid place-items-center">
					<Ring size={50} lineWeight={5} speed={2} color="#2563eb" />
				</section>
			</div>
		);
	}

	return (
		<main className="main__container">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Navigate replace to="/files" />}
					/>
					<Route
						path="/*"
						element={
							<RequireAuth>
								<RequireEmailVerified>
									<DashboardPage />
								</RequireEmailVerified>
							</RequireAuth>
						}
					>
						<Route path="files" element={<MyFilesPage />} />
						<Route path="upload" element={<UploadPage />} />
						<Route path="account" element={<AccountPage />} />
					</Route>
					<Route
						path="/login"
						element={
							<RedirectAuth>
								<LoginPage />
							</RedirectAuth>
						}
					/>
					<Route
						path="/signup"
						element={
							<RedirectAuth>
								<SignupPage />
							</RedirectAuth>
						}
					/>
					<Route
						path="/reset-password"
						element={
							<RedirectAuth>
								<ResetPasswordPage />
							</RedirectAuth>
						}
					/>
					<Route
						path="/verify-email"
						element={
							<RequireAuth>
								<RedirectEmailVerified>
									<VerifiEmailPage />
								</RedirectEmailVerified>
							</RequireAuth>
						}
					/>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</main>
	);
};

export default App;
