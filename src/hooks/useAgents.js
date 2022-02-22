import { useState } from "react";
import { agentsCollection } from "../db/collections";
const useAgents = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const fetch = async (fetchInactive) => {
    setLoading(true);
    setData(null)
    setError(null);
    try {
      const getAction = fetchInactive
        ? agentsCollection.getAll
        : agentsCollection.getFilteredHOF;
      const agents = await getAction("deleted", "==", fetchInactive);
      setData(agents);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, fetch, error };
};

export default useAgents;
