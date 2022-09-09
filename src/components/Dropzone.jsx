import { useAppContext } from "../context/AppContext";
import { useDropzone } from "react-dropzone";
import { useMemo, useState, useEffect } from "react";
import { FolderOpenIcon, XIcon } from "@heroicons/react/solid";
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
    const { handleUploadFiles } = useAppContext();

    const [state, setState] = useState({});
    const [clicked, setClicked] = useState(true);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles,
    } = useDropzone({ accept: { "image/*": [] }, maxFiles: 4 });

    useEffect(() => {
        setState(
            acceptedFiles.reduce(
                (obj, item, index) => ({
                    ...obj,
                    [index]: {
                        file: item,
                        uploading: false,
                        error: false,
                        done: false,
                        url: null,
                    },
                }),
                {}
            )
        );

        setClicked(false);
    }, [acceptedFiles]);

    const handleUpload = () => {
        handleUploadFiles(state, setState);
        setClicked(true);
    };

    const handleDeleteFile = (indexFile) => {
        const { [indexFile]: _, ...rest } = state;
        setState(rest);
    };

    console.log(state);

    const style = useMemo(
        () => ({
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    const files = Object.entries(state).map(([index, { file, uploading, error, done }]) => (
        <motion.li variants={item} className="flex flex-col gap-2" key={index}>
            <div className="flex justify-between items-center gap-4">
                <span className="text-sm text-black font-medium">
                    {file.path.split(".")[0]}
                </span>
                {!clicked && (
                    <XIcon
                        onClick={() => handleDeleteFile(index)}
                        className="w-4 h-4 cursor-pointer text-black"
                    />
                )}
            </div>

            <span className="text-xs text-gray-500">
                {file.size} bytes
            </span>

            {uploading && <span className="text-xs text-gray-500">Uploading</span>}
            {error && <span className="text-xs text-red-500">Error</span>}
            {done && <span className="text-xs text-green-600">Done</span>}
        </motion.li>
    ));

    return (
        <div className="box">
            <h2 className="text-base text-black font-medium">
                Upload your files
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
                    <p className="text-sm">Drag & drop your files here.</p>
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
                            Files ({ Object.keys(state).length })
                        </motion.h4>
                        <ul className="flex flex-col gap-4">{files}</ul>
                        <button
                            type="button"
                            className="button button--primary"
                            onClick={handleUpload}
                            disabled={clicked}
                        >
                            Upload {files.length > 1 ? "files" : "file"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
