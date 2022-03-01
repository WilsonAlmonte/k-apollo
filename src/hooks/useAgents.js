import { useState } from "react";
import { agentsCollection } from "../db/collections";
const useAgentsData = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const addAgent = async (agent) => {
    try {
      await agentsCollection.create(agent);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateAgent = async (agent) => {
    try {
      await agentsCollection.update(agent);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetch = async () => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const agents = await agentsCollection.getAll();
      setData(agents);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { data, loading, fetch, error, addAgent, updateAgent };
};

export default useAgentsData;
