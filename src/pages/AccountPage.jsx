import { AccountSectionInformation } from "../components/Account/AccountSectionInformation";
import { AccountSectionSecurity } from "../components/Account/AccountSectionSecurity";
import { AccountSectionDangerZone } from "../components/Account/AccountSectionDangerZone";

export const AccountPage = () => {
	return (
		<section className="flex flex-col items-center justify-center gap-6 overflow-auto">
			<div className="w-full flex flex-col gap-2">
				<h1 className="text-xl font-medium text-black">Account</h1>
				<p className="text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
			</div>
			<div className="w-full flex flex-col gap-4 p-2 overflow-auto">
				<AccountSectionInformation />
				<AccountSectionSecurity />
				<AccountSectionDangerZone />
			</div>
		</section>
	);
};
