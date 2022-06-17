import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import toast from "react-hot-toast";
import {
	EmailAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updatePassword,
	reauthenticateWithCredential,
	sendPasswordResetEmail,
	sendEmailVerification,
	deleteUser,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const authUser = auth.currentUser;
	const provider = new GoogleAuthProvider();
	const [authState, setAuthState] = useState({
		user: authUser,
		isLoading: true,
	});

	const signInWithGoogle = () =>
		toast.promise(signInWithPopup(auth, provider), {
			loading: "Please await...",
			success: <b>Sign in succesfully</b>,
			error: ({ message }) => message,
		});

	const handleVerifyEmail = () =>
		toast.promise(sendEmailVerification(auth.currentUser), {
			loading: "Please await...",
			success: <b>Email verification sent!</b>,
			error: ({ message }) => message,
		});

	const handleReauthenticate = ({ email, password }, callback) => {
		const credential = EmailAuthProvider.credential(email, password);

		reauthenticateWithCredential(authUser, credential)
			.then(() => callback())
			.catch(({ message }) => toast.error(message));
	};

	const handleDeleteAccount = () =>
		toast.promise(deleteUser(authUser), {
			loading: "Please await...",
			success: <b>Deleted account successfully!</b>,
			error: ({ message }) => message,
		});

	const handleChangePassword = (newPassword) =>
		toast.promise(updatePassword(authUser, newPassword), {
			loading: "Please await...",
			success: <b>Password changed successfully!</b>,
			error: ({ message }) => message,
		});

	const handlePasswordReset = (email) =>
		toast.promise(sendPasswordResetEmail(auth, email), {
			loading: "Please await...",
			success: <b>We have sent you an email to reset your password.</b>,
			error: ({ message }) => message,
		});

	const handleSignup = ({ email, password }) =>
		toast.promise(createUserWithEmailAndPassword(auth, email, password), {
			loading: "Please await...",
			success: <b>Signup account successfully!</b>,
			error: ({ message }) => message,
		});

	const handleLogin = ({ email, password }) =>
		toast.promise(signInWithEmailAndPassword(auth, email, password), {
			loading: "Please await...",
			success: <b>Login account successfully!</b>,
			error: ({ message }) => message,
		});

	const handleOut = () =>
		toast.promise(signOut(auth), {
			loading: "Please await...",
			success: <b>Sign out successfully!</b>,
			error: ({ message }) => message,
		});

	const handleAuthStateChanged = (user) => {
		if (user) {
			setAuthState({ user, isLoading: false });
		} else {
			setAuthState({ user: null, isLoading: false });
		}
	};

	useEffect(() => {
		const unsuscribe = onAuthStateChanged(auth, handleAuthStateChanged);
		return () => unsuscribe();
	}, []);

	const value = {
		handleSignup,
		handleLogin,
		handleOut,
		handleReauthenticate,
		handleChangePassword,
		handlePasswordReset,
		handleDeleteAccount,
		handleVerifyEmail,
		signInWithGoogle,
		user: authState.user,
		isLoading: authState.isLoading,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
