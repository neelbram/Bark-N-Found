// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMf9raTB2ZMQ50-4kPn2p9eodfo4Wtlgg",
  authDomain: "bark-and-found.firebaseapp.com",
  projectId: "bark-and-found",
  storageBucket: "bark-and-found.appspot.com",
  messagingSenderId: "50896154824",
  appId: "1:50896154824:web:4d56df4d65abadb7cf75fd",
  measurementId: "G-ESYERKLPW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);


export default app 