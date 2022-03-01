import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import useAgentsData from "../hooks/useAgents";
const AgentsContext = createContext();
export const useAgents = () => useContext(AgentsContext);
export const AgentsProvider = ({ children }) => {
  const { loading, data, error, fetch, addAgent, updateAgent } =
    useAgentsData();
  const [initialLoading, setInitialLoading] = useState(true);

  const init = () => {
    fetch().finally(() => {
      setInitialLoading(false);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const upsertAgent = async (agent) => {
    let actionPerformed = "";
    if (!agent.id) {
      await addAgent(agent);
      actionPerformed = "inserted";
    } else {
      await updateAgent(agent);
      actionPerformed = "updated";
    }
    fetch();
    return actionPerformed;
  };

  const value = {
    loading,
    data,
    upsertAgent,
    error,
  };

  return (
    <AgentsContext.Provider value={value}>
      {initialLoading ? <Loading initial={true} open={initialLoading} /> : children}
    </AgentsContext.Provider>
  );
};
