import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx-XZyVnFvhKglziQJZDtcxTDSllLAchU",
  authDomain: "tienglong-34e90.firebaseapp.com",
  projectId: "tienglong-34e90",
  storageBucket: "tienglong-34e90.appspot.com",
  messagingSenderId: "1058256371735",
  appId: "1:1058256371735:web:7a56f279fe18e336949c52",
  measurementId: "G-55Q6D2C4B5",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

async function signInUser(data: { email: string; password: string }) {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    console.error(error);
  }
}



