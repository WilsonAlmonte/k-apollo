import { getDocs, query, where } from "firebase/firestore";
import { configureCollection } from "./configureCollection";

const callsCollection = configureCollection(
  "calls",
  {
    getAll: "An Error has ocurred while getting the calls",
  },
  ({ collectionRef, db, collectionName, docMap }) => {
    const getCallsReport = async (startDate, endDate) => {
      try {
        const q = query(collectionRef, where("date", ">=", startDate), where("date", "<", endDate));
        const { docs } = await getDocs(q);
        const result = docs.map(docMap);
        return result;
      } catch (err) {
        console.error(err);
        throw new Error("An error has ocurred while generating your report");
      }
    };
    return { getCallsReport };
  }
);

export default callsCollection;
