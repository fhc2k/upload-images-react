import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

export const AccountSectionDangerZone = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { handleReauthenticate, handleDeleteAccount } = useAuthContext();

	const onSubmit = (data) =>
		handleReauthenticate(data, () => handleDeleteAccount());

	return (
		<div className="bg-white flex flex-col gap-4 p-8 rounded-xl shadow-lg">
			<h1 className="text-base text-black font-medium">Danger zone</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div
					className={`form__field ${
						"email" in errors ? "form__field--error" : ""
					}`}
				>
					<label className="form__field__label">Email address</label>
					<input
						{...register("email", { required: true })}
						type="text"
						className="form__field__text"
						autoComplete="false"
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
						{...register("password", { required: true })}
						type="password"
						className="form__field__text"
						autoComplete="false"
						placeholder="Enter your password"
					/>
				</div>
				<button
					type="submit"
					className="button button--error"
					disabled={Object.keys(errors).length > 0}
				>
					Delete account
				</button>
			</form>
		</div>
	);
};
