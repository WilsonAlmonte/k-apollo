import { groupBy } from "lodash";
import { useState } from "react";
import { useAgents } from "../contexts/AgentsContext";
import callsCollection from "../db/collections/calls";
import { getEndOfDay, getStartOfDay } from "../utils/dateUtils";

const useCallsReport = () => {
  const { data: agentsData } = useAgents();
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const addCall = async (agent) => {
    try {
      await callsCollection.create(agent);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCall = async (agent) => {
    try {
      await callsCollection.update(agent);
    } catch (err) {
      setError(err.message);
    }
  };

  const upsertCall = async (agent, date) => {
    let actionPerformed = "";
    if (!agent.id) {
      await addCall(agent);
      actionPerformed = "inserted";
    } else {
      await updateCall(agent);
      actionPerformed = "updated";
    }
    await fetch(date);
    return actionPerformed;
  };

  const fetch = async (date) => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const timestampStart = getStartOfDay(date);
      const timestampEnd = getEndOfDay(date);
      const result = await callsCollection.getCallsReport(
        timestampStart,
        timestampEnd
      );
      const groupedByAgent = groupBy(result, "agentId");
      const report = agentsData.map((agent) => ({
        ...agent,
        calls: groupedByAgent[agent.id],
      }));
      setData(report);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { data, loading, fetch, error, upsertCall };
};

export default useCallsReport;
