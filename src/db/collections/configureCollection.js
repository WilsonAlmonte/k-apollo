import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import db from "../index";

const docMap = (doc) => ({ ...doc.data(), id: doc.id });
export const configureCollection = (
  collectionName,
  errorMessages = {},
  getExtraMethods
) => {
  const genericErrorMessage =
    "An error has ocurred while performing the action";
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

  const create = async (newDoc) => {
    try {
      await addDoc(collectionRef, { ...newDoc, deleted: false });
    } catch (err) {
      console.error(err);
      throw new Error(errorMessages["create"] || genericErrorMessage);
    }
  };

  const update = async ({ id, ...rest }) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { ...rest });
    } catch (err) {
      console.error(err);
      throw new Error(errorMessages["update"] || genericErrorMessage);
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
      const q = query(collectionRef, where(...filter));
      const { docs } = await getDocs(q);
      const result = docs.map(docMap);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(errorMessages["getFiltered"] || genericErrorMessage);
    }
  };

  let externalMethods = {};

  if (getExtraMethods) {
    externalMethods = getExtraMethods({ collectionRef, db, collectionName, docMap });
  }

  return { collectionRef, getAll, getById, getFilteredHOF, create, update, ...externalMethods };
};
