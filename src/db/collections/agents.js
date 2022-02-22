import { configureCollection } from "./configureCollection";

const agentsCollection = configureCollection("agents", {
  getAll: "An Error has ocurred while getting the agents",
});

export default agentsCollection;
