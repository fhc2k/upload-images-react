import {
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react";
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
	getDocs,
	query,
	where,
	onSnapshot,
} from "firebase/firestore";
import { useAuthContext } from "./AuthContext";
import { appReducer, initialState } from "../reducers/appReducer";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
	const { user } = useAuthContext();
	const [state, dispatch] = useReducer(appReducer, initialState);

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

	const handleUploadFile = (file) => {
		const fileUid = uuidv4();
		const storageRef = ref(storage, `images/${user.uid}/${fileUid}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				dispatch({ type: "uploading" });
			},
			(error) => {
				toast.error("Error upload file.");
				dispatch({ type: "reset" });
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					createRegisterFile({
						fileUrl: url,
						fileUid,
						fileName: file.name,
						fileSize: file.size,
						userUid: user.uid,
					});
					dispatch({ type: "done", payload: url });
				});
			}
		);
	};

	useEffect(() => {
		const queryDB = query(
			collection(db, "files"),
			where("userUid", "==", user.uid)
		);
		const unsubscribe = onSnapshot(queryDB, (snap) => {
			const data = snap.docs.map((doc) => doc.data());
			dispatch({ type: "set_data", payload: data });
		});

		return () => unsubscribe();
	}, []);

	const value = {
		handleUploadFile,
		handleDeleteFile,
		dispatch,
		state,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
