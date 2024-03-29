import { DocumentSnapshot } from "firebase/firestore";

export type WordFormData = {
  word: string;
  definition: string;
  example: string;
  tags: string[],
  author: string;
}

export function validWord(wordDetails: WordFormData) {
  const { word, definition, example, tags, author } = wordDetails;
  const wordDetailsArray = [word, definition, example, tags, author];
  try {
    wordDetailsArray.forEach(detail => {
      if (typeof detail === 'undefined') throw new Error('Word is not valid');
    });
  } catch (error) {
    return false;
  }
  return true;
}

/**
 * `Converts a firestore document to JSON`
 * @param  {DocumentSnapshot} doc
 */
export function docToJSON(doc: DocumentSnapshot) {
  const data = doc.data();
  return JSON.parse(JSON.stringify(data));
};
