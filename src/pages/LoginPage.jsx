import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { GoogleIcon } from "../components/Icons/GoogleIcon";

export const LoginPage = () => {
	const { handleLogin, signInWithGoogle } = useAuthContext();

	const schema = yup.object().shape({
		email: yup.string().required(),
		password: yup.string().required(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = ({ email, password }) => handleLogin({ email, password });

	return (
		<section className="w-full h-screen grid place-items-center">
			<div className="bg-white max-w-[350px] flex flex-col gap-8 text-center px-8 py-12 rounded-xl shadow-lg">
				<header className="w-full flex flex-col gap-3 text-left">
					<h1 className="text-xl font-medium text-black">Login</h1>
					<p>Upload your images FREE and sharing in the web</p>
				</header>
				<form onSubmit={handleSubmit(onSubmit)} className="form">
					<div
						className={`form__field ${
							"email" in errors ? "form__field--error" : ""
						}`}
					>
						<label className="form__field__label">
							Email address
						</label>
						<input
							{...register("email")}
							type="email"
							className="form__field__text"
							placeholder="Enter your email"
						/>
					</div>
					<div
						className={`form__field ${
							"password" in errors ? "form__field--error" : ""
						}`}
					>
						<label className="form__field__label">Password</label>
						<input
							{...register("password")}
							type="password"
							className="form__field__text"
							placeholder="Enter your password"
						/>
					</div>
					<p className="flex items-center justify-between gap-2 text-right">
						<span>Forget your password? </span>
						<Link to="/reset-password" className="link text--end">
							Reset
						</Link>
					</p>
					<button
						type="submit"
						className="button button--primary"
						disabled={Object.keys(errors).length}
					>
						Log in
					</button>
					<button
						type="button"
						className="button button--secondary"
						onClick={signInWithGoogle}
					>
						<GoogleIcon width="1.25rem" height="1.25rem" />
						<span>Sign in with Google</span>
					</button>
					<p className="text-center">
						<span>Don't have account? </span>
						<Link to="/signup" className="link">
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};
