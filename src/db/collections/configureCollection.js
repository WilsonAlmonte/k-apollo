import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import db from "../index";

const docMap = (doc) => ({ ...doc.data(), id: doc.id });
export const configureCollection = (collectionName, errorMessages = {}) => {
  const genericErrorMessage =
    "An error has ocurred while getting your document";
  const collectionRef = collection(db, collectionName);
  const getAll = async () => {
    try {
      const { docs } = await getDocs(collectionRef);
      const result = docs.map(docMap);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(errorMessages["getAll"] || genericErrorMessage);
    }
  };

  const getById = async (id) => {
    try {
      const doc = await getDoc(id);
      const result = docMap(doc);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(errorMessages["getById"] || genericErrorMessage);
    }
  };

  const getFilteredHOF = async (...filter) => {
    try {
      console.log(filter)
      const q = query(collectionRef, where(...filter));
      const { docs } = await getDocs(q);
      const result = docs.map(docMap);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(errorMessages["getFiltered"] || genericErrorMessage);
    }
  };
  return { collectionRef, getAll, getById, getFilteredHOF };
};
