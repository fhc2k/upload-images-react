import { useAuthContext } from "../../context/AuthContext";

export const AccountSectionInformation = () => {
	const { user } = useAuthContext();

	return (
		<div className="bg-white flex flex-col gap-4 p-8 rounded-xl shadow-lg">
			<h1 className="text-base text-black font-medium">Account information</h1>
			<div className="form__field">
				<label className="form__field__label">UID Account</label>
				<input
					readOnly={true}
					type="text"
					className="form__field__text"
					value={user.uid}
				/>
			</div>
			<div className="form__field">
				<label className="form__field__label">Email address</label>
				<input
					readOnly={true}
					type="text"
					className="form__field__text"
					value={user.email}
				/>
			</div>
			<div className="form__field">
				<label className="form__field__label">Phone number</label>
				<input
					readOnly={true}
					type="text"
					className="form__field__text"
					value={user.number || "unkdown"}
				/>
			</div>
			<div className="form__field">
				<label className="form__field__label">
					Date account created
				</label>
				<input
					readOnly={true}
					type="text"
					className="form__field__text"
					value={user.metadata.creationTime}
				/>
			</div>
			<div className="form__field">
				<label className="form__field__label">Last sign</label>
				<input
					readOnly={true}
					type="text"
					className="form__field__text"
					value={user.metadata.lastSignInTime || "unkdown"}
				/>
			</div>
		</div>
	);
};