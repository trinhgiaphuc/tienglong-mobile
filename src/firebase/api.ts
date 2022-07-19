import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from ".";
import { UserDetails } from "../typings";
import { validWord, WordFormData } from "./utils";

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


export async function submitDefinition(wordData: WordFormData) {
  if (!validWord(wordData)) {
    return;
  }

  const { uid } = auth.currentUser!;

  const colRef = collection(db, 'user-words', uid, 'words');
  const docRef = doc(colRef);

  try {
    await setDoc(docRef, {
      ...wordData,
      id: docRef.id,
      authorId: uid,
      heartCount: 0,
      status: 'pending',
      createdAt: Timestamp.now().toMillis(),
      updatedAt: Timestamp.now().toMillis(),
    });
  } catch (error) {
    console.error(error);
  }
}
