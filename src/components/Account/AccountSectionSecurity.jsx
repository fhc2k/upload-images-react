import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

export const AccountSectionSecurity = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { handleReauthenticate, handleChangePassword } = useAuthContext();

	const onSubmit = ({ email, currentPassword, newPassword }) => 
		handleReauthenticate(
			{ email, password: currentPassword }, 
			() => handleChangePassword(newPassword)
		);

	return (
		<div className="bg-white flex flex-col gap-4 p-8 rounded-xl shadow-lg">
			<h1 className="text-base text-black font-medium">Account Security</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="form"
			>
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
						type="text"
						className="form__field__text"
						autoComplete="off"
						placeholder="Enter your email"
					/>
				</div>
				<div
					className={`form__field ${
						"currentPassword" in errors ? "form__field--error" : ""
					}`}
				>
					<label className="form__field__label">
						Current password
					</label>
					<input
						{...register("currentPassword", { required: true })}
						type="password"
						className="form__field__text"
						autoComplete="false"
						placeholder="Enter your current password"
					/>
				</div>
				<div
					className={`form__field ${
						"newPassword" in errors ? "form__field--error" : ""
					}`}
				>
					<label className="form__field__label">
						New password 
					</label>
					<input
						{...register("newPassword", { required: true })}
						type="password"
						className="form__field__text"
						autoComplete="false"
						placeholder="Enter your new password "
					/>
				</div>
				<button 
					type="submit" 
					className="button button--primary"
					disabled={Object.keys(errors).length > 0}
				>
					Change password
				</button>
			</form>
		</div>
	);
};