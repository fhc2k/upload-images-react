import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { GoogleIcon } from "../components/Icons/GoogleIcon";

export const SignupPage = () => {
	const { handleSignup, signInWithGoogle } = useAuthContext();

	const schema = yup.object().shape({
		email: yup.string().required().email(),
		password: yup
			.string()
			.required()
			.min(8, "Password is too short - should be 8 chars minimum.")
			.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref("password"), null], "Passwords must match"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = ({ email, password }) => handleSignup({ email, password });

	return (
		<section className="w-full h-screen grid place-items-center">
			<div className="bg-white max-w-[350px] flex flex-col gap-8 text-center px-8 py-12 rounded-xl shadow-lg">
				<header className="w-full flex flex-col gap-3 text-left">
					<h1 className="text-xl font-medium text-black">Signup</h1>
					<p>Register an account for upload your images</p>
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
					<div
						className={`form__field ${
							"passwordConfirmation" in errors
								? "form__field--error"
								: ""
						}`}
					>
						<label className="form__field__label">
							Confirm password
						</label>
						<input
							{...register("passwordConfirmation")}
							type="password"
							className="form__field__text"
							placeholder="Confirm your password"
						/>
					</div>
					<button
						type="submit"
						className="button button--primary"
						disabled={Object.keys(errors).length > 0}
					>
						Create account
					</button>
					<button
						type="button"
						className="button button--secondary"
						onClick={signInWithGoogle}
					>
						<GoogleIcon width="1.25rem" height="1.25rem" />
						Sign in with Google
					</button>
					<p className="text-center">
						<span>Don't have account? </span>
						<Link to="/login" className="link">
							Log in
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};
