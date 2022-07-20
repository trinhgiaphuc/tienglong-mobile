import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, FieldValue, getDoc, getDocs, getFirestore, increment, limit, query, setDoc, Timestamp, where, writeBatch } from "firebase/firestore";
import { auth, db } from ".";
import { UserDetails } from "../typings";
import { docToJSON, validWord, WordFormData } from "./utils";

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

export async function getWordsAndHearts(uid: string) {
  const wordsAndHeartsRef = doc(db, 'user-words', uid);

  try {
    const doc = await getDoc(wordsAndHeartsRef);
    if (doc.exists()) {
      return doc.data();
    } else {
      return { hearts: 0, words: 0 };
    }
  } catch (error) {
    return { hearts: -1, words: -1 };
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

export async function getUserWord(uid: string) {
  const wordRef = collection(db, 'user-words', uid, 'words');

  const q = query(wordRef, where('status', '==', 'published'), limit(8));

  const response = await getDocs(q);

  if (response.empty) {
    return [];
  } else {
    return response.docs.map(docToJSON);
  }
}

export async function reportWord(wordId: string, message: string) {
  const reporterId = auth.currentUser!.uid;
  const ref = doc(db, 'reports', `${wordId}-${reporterId}`)

  try {
    await setDoc(ref, { message });
  } catch (error) {
    console.error(error);
  }
}


export async function checkHearted(wordId: string) {
  const likerId = auth.currentUser?.uid;
  const heartRef = doc(db, 'hearts', `${wordId}-${likerId}`);

  try {
    const doc = await getDoc(heartRef);
    if (doc.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }

}

export async function addHeart(wordId: string, authorId: string) {
  const likerId = auth.currentUser?.uid;

  const heartRef = doc(db, 'hearts', `${wordId}-${likerId}`);
  const wordHeartRef = doc(db, 'user-words', `${authorId}`);
  const wordRef = doc(db, 'user-words', authorId, 'words', wordId);

  const batch = writeBatch(db);

  batch.set(heartRef, { heartedAt: Timestamp.now().toMillis() });
  batch.update(wordHeartRef, { hearts: increment(1) });
  batch.update(wordRef, { heartCount: increment(1) });

  try {
    await batch.commit();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function removeHeart(wordId: string, authorId: string) {
  const likerId = auth.currentUser?.uid;

  const heartRef = doc(db, 'hearts', `${wordId}-${likerId}`);
  const wordHeartRef = doc(db, 'user-words', `${authorId}`);
  const wordRef = doc(db, 'user-words', authorId, 'words', wordId);

  const batch = writeBatch(db);

  batch.delete(heartRef);
  batch.update(wordHeartRef, { hearts: increment(-1) });
  batch.update(wordRef, { heartCount: increment(-1) });

  try {
    await batch.commit();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

