import { useAppContext } from "../context/AppContext";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";
import { FolderOpenIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";

const focusedStyle = {
	border: "2px dashed #2196f3",
};

const acceptStyle = {
	border: "2px dashed #2196f3",
	backgroundColor: "#f3f8ff",
};

const rejectStyle = {
	border: "2px dashed #ff1744",
};

const container = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.5,
			staggerChildren: 0.3,
		},
	},
	exit: { opacity: 0 },
};

const item = {
	hidden: { x: 20, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
	},
};

export const Dropzone = () => {
	const { handleUploadFile } = useAppContext();

	const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
		acceptedFiles,
	} = useDropzone({ accept: { "image/*": [] }, maxFiles: 1 });

	const style = useMemo(
		() => ({
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	const files = acceptedFiles.map(({ path, size }, index) => (
		<motion.li
			variants={item}
			className="flex flex-col gap-2"
			key={index}
		>
			<span className="text-sm text-black font-medium">
				{path.split(".")[0]}
			</span>
			<span className="text-xs text-gray-500">
				Size: {size} bytes
			</span>
		</motion.li>
	));

	return (
		<div className="box">
			<h2 className="text-base text-black font-medium">
				Upload your file
			</h2>
			<div
				{...getRootProps({
					style,
					className:
						"flex flex-col items-center justify-center text-center gap-5 px-8 py-12 rounded-xl border-2 border-dashed border-gray-300 cursor-pointer",
				})}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center justify-center gap-4">
					<FolderOpenIcon className="w-16 h-16 text-blue-400" />
					<p className="text-sm">Drag & drop your files here</p>
				</div>
			</div>
			<AnimatePresence>
				{files.length && (
					<motion.div
						variants={container}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="w-full flex flex-col gap-6"
					>
						<motion.h4
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -20, opacity: 0 }}
							className="font-medium"
						>
							Files
						</motion.h4>
						<ul className="flex flex-col gap-4">{files}</ul>
						<button
							type="button"
							className="button button--primary"
							onClick={() => handleUploadFile(acceptedFiles[0])}
						>
							Upload file
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
