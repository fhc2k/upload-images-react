import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { RenderIf } from "../utilities/RenderIf";
import { useToggle } from "../hooks/useToggle";
import { MenuIcon, XIcon, ChevronDownIcon, CollectionIcon, CloudUploadIcon } from "@heroicons/react/outline";

export const Navbar = () => {
	const { user, handleOut } = useAuthContext();
	const [visibleMenu, toggleVisibleMenu] = useToggle(false);

	const itemIsActive = ({ isActive }) =>
		`flex items-center gap-2 text-base font-medium transition duration-500 ${
			isActive ? "text-blue-500" : "text-gray-400"
		}`;

	const menuIsVisible = visibleMenu ? "flex" : "hidden";

	return (
		<nav className="sticky z-50 flex items-center justify-between">
			<RenderIf isTrue={visibleMenu}>
				<XIcon
					className="w-6 h-6 cursor-pointer text-blue-600 md:hidden"
					onClick={toggleVisibleMenu}
				/>
			</RenderIf>
			<RenderIf isTrue={!visibleMenu}>
				<MenuIcon
					className="w-6 h-6 cursor-pointer text-blue-600 md:hidden"
					onClick={toggleVisibleMenu}
				/>
			</RenderIf>
			<ul
				className={`absolute top-12 bg-white w-full ${menuIsVisible} flex-col items-center justify-center gap-4 px-8 py-6 rounded-lg shadow-lg md:static md:top-0 md:w-auto md:bg-transparent md:flex md:flex-row md:p-0 md:shadow-none`}
			>
				<li>
					<NavLink
						to="files"
						className="text-base md:text-xl font-medium text-black cursor-pointer mr-4"
					>
						Upload X
					</NavLink>
				</li>
				<li>
					<NavLink to="files" className={itemIsActive}>
						<CollectionIcon className="w-5 h-5 text-inherit" />
						<span>Files</span>	
					</NavLink>
				</li>
				<li>
					<NavLink to="upload" className={itemIsActive}>
						<CloudUploadIcon className="w-5 h-5 text-inherit" />
						<span>Upload File</span>	
					</NavLink>
				</li>
			</ul>
			<MenuDropdown.menu>
				<MenuDropdown.button>
					{"photoURL" in user ? (
						<img
							src={user.photoURL}
							className="w-8 h-8 rounded-full object-cover"
						/>
					) : (
						<div className="bg-blue-100 w-8 h-8 grid place-items-center rounded-full">
							<span className="text-xl font-medium text-black">
								{user.email[0].toUpperCase()}
							</span>
						</div>
					)}
					<ChevronDownIcon
						onClick={toggleVisibleMenuDropdown}
						className="w-5 h-5 text-black cursor-pointer"
					/>
				</MenuDropdown.button>
				<MenuDropdown.transition>
					{visibleMenuDropdown && (
						<MenuDropdown.dropdown>
							<MenuDropdown.item>
								<Link to="account">Account Settings</Link>
							</MenuDropdown.item>
							<MenuDropdown.item>
								<a onClick={handleOut}>Sign out</a>
							</MenuDropdown.item>
						</MenuDropdown.dropdown>
					)}
				</MenuDropdown.transition>
			</MenuDropdown.menu>
		</nav>
	);
};
