import { createContext, useContext, useEffect } from "react";
import { db, storage } from "../services/firebase";
import {
    ref,
    deleteObject,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import {
    doc,
    collection,
    setDoc,
    deleteDoc,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";
import { useAuthContext } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [state, setState] = useState({
        data: [],
        isLoading: true,
    });

    const { user } = useAuthContext();

    const createRegisterFile = (data) => {
        data = { ...data, fileDate: new Date().getTime() };

        toast.promise(setDoc(doc(db, "files", data.fileUid), data), {
            loading: "Please await...",
            success: <b>File upload successfully!</b>,
            error: ({ message }) => message,
        });
    };

    const handleDeleteDoc = (fileUid) =>
        toast.promise(deleteDoc(doc(db, "files", fileUid)), {
            loading: "Deleting...",
            success: <b>Image Deleted!</b>,
            error: ({ message }) => message,
        });

    const handleDeleteFile = (fileUid) =>
        deleteObject(ref(storage, `images/${user.uid}/${fileUid}`))
            .then(() => handleDeleteDoc(fileUid))
            .catch(({ message }) => toast.error(message));

    const handleUploadFiles = (files, setState) => {
        Object.entries(files).forEach(([index, data]) => {
            const fileUid = uuidv4();
            const storageRef = ref(storage, `images/${user.uid}/${fileUid}`);
            const uploadTask = uploadBytesResumable(storageRef, data.file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setState((prev) => ({
                        ...prev,
                        [index]: { ...data, uploading: true },
                    }));
                },
                (error) => {
                    setState((prev) => ({
                        ...prev,
                        [index]: { ...data, uploading: false, error: true },
                    }));
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        createRegisterFile({
                            fileUrl: url,
                            fileUid,
                            fileName: data.file.name,
                            fileSize: data.file.size,
                            userUid: user.uid,
                        });
                        setState((prev) => ({
                            ...prev,
                            [index]: {
                                ...data,
                                uploading: false,
                                done: true,
                                url,
                            },
                        }));
                    });
                }
            );
        });
    };

    useEffect(() => {
        const queryDB = query(
            collection(db, "files"),
            where("userUid", "==", user.uid)
        );
        const unsubscribe = onSnapshot(queryDB, (snap) => {
            const data = snap.docs.map((doc) => doc.data());
            setState({ ...state, data, isLoading: false });
        });

        return () => unsubscribe();
    }, []);

    const value = {
        handleUploadFiles,
        handleDeleteFile,
        state,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
