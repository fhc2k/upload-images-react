import moment from "moment";
import { useAppContext } from "../context/AppContext";
import { useClipboard } from "../hooks/useClipboard";
import {
	DotsVerticalIcon,
	PhotographIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { useToggle } from "../hooks/useToggle";
import { Fragment } from "react";
import { ClipboardCopyIcon, ExternalLinkIcon, TrashIcon } from "@heroicons/react/outline";

export const CardFile = ({ data }) => {
	const { handleDeleteFile } = useAppContext();
	const { fileUid, fileName, fileSize, fileUrl, fileDate } = data;
	const [stateClipboard, setClipboard] = useClipboard("Copy");

	return (
		<figure className="relative bg-slate-50 flex flex-col flex-auto px-4 py-6 rounded-lg">
			<figcaption className="h-full flex flex-col gap-3">
				<div className="flex items-center justify-between gap-4">
					<span className="w-60 text-sm truncate text-black font-medium">
						{fileName}
					</span>
					<Menu as="div" className="relative inline-block text-left">
						<Menu.Button>
							<DotsVerticalIcon
								className="w-5 h-5 cursor-pointer"
							/>
						</Menu.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 mt-2 w-56 bg-white origin-top-right rounded-lg shadow-lg z-10">
								<div className="p-4">
									<Menu.Item>
										<button
											className={`text-gray-900 w-full flex items-center gap-4 rounded-md px-2 py-2 text-sm hover:bg-gray-100`}
											onClick={() => setClipboard(fileUrl)}
										>
											<ClipboardCopyIcon className="w-5 h-5 text-blue-500" />
											<span>Copy URL</span>
										</button>
									</Menu.Item>
									<Menu.Item>
										<a
											className={`text-gray-900 w-full flex items-center gap-4 rounded-md px-2 py-2 text-sm hover:bg-gray-100`}
											href={fileUrl}
											target="_black"
										>
											<ExternalLinkIcon className="w-5 h-5 text-blue-500" />
											<span>Open in new tab</span>
										</a>
									</Menu.Item>
									<Menu.Item>
										<button
											className={`text-red-500 w-full flex items-center gap-4 rounded-md px-2 py-2 text-sm hover:bg-gray-100`}
											onClick={() => handleDeleteFile(fileUid)}
										>
											<TrashIcon className="w-5 h-5 text-red-500" />
											<span>Delete image</span>
										</button>
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
				<p className="text-xs text-gray-400">
					<span>Size: </span>
					<span>{(fileSize / 1_000_000).toFixed(2)} mb</span>
				</p>
				<p className="text-xs text-gray-400">
					<span>Uploaded: </span>
					<span>
						{moment(moment(moment(fileDate)._i).format()).fromNow()}
					</span>
				</p>
			</figcaption>
		</figure>
	);
};
