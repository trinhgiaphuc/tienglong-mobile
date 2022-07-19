import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx-XZyVnFvhKglziQJZDtcxTDSllLAchU",
  authDomain: "tienglong-34e90.firebaseapp.com",
  projectId: "tienglong-34e90",
  storageBucket: "tienglong-34e90.appspot.com",
  messagingSenderId: "1058256371735",
  appId: "1:1058256371735:web:7a56f279fe18e336949c52",
  measurementId: "G-55Q6D2C4B5",
};

let app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });
export const storage = getStorage();
