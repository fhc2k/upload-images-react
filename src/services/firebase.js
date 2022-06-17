import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAw_ZzjHKWI8D-Ee_oPA3sf5Ve17p_aM24",
    authDomain: "upload-images-fb6d5.firebaseapp.com",
    projectId: "upload-images-fb6d5",
    storageBucket: "upload-images-fb6d5.appspot.com",
    messagingSenderId: "88371987990",
    appId: "1:88371987990:web:0c9e9075817952cc4cd737"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { db, storage, auth };