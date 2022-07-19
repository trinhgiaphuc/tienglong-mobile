import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth, db } from ".";
import { UserDetails } from "../typings";

export async function signInUser(data: { email: string; password: string }) {
  try {
    const cred = await signInWithEmailAndPassword(auth, data.email, data.password);
    return cred;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserDetails(uid: string): Promise<UserDetails | null> {
  const ref = doc(db, 'users', uid);

  try {
    const doc = await getDoc(ref);
    if (doc.exists()) {
      return doc.data() as unknown as UserDetails;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


