import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const { handlePasswordReset } = useAuthContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = ({ email }) => handlePasswordReset(email);

	return (
		<section className="w-full h-screen grid place-items-center">
			<div className="box max-w-xs">
				<div className="flex flex-col gap-3">
					<h1 className="text-xl font-medium text-black">
						Reset your password
					</h1>
					<p className="text-sm">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
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
							{...register("email", { required: true })}
							className="form__field__text"
							placeholder="Enter your email"
						/>
					</div>
					<button
						type="submit"
						className="button button--primary"
						disabled={Object.keys(errors).length}
					>
						Reset password
					</button>
					<button
						type="button"
						className="button button--secondary"
						onClick={() => navigate("/login")}
					>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
};
