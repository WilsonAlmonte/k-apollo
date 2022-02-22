import { configureCollection } from "./configureCollection";

const callsCollection = configureCollection("calls", {
  getAll: "An Error has ocurred while getting the calls",
});

callsCollection.getCallsByAgent = (angentId) =>
  callsCollection.getFilteredHOF("agentId", "==", angentId);

export default callsCollection;
