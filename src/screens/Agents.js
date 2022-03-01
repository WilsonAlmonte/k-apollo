import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

import Layout from "../components/Layout";
import AgentCard from "../components/AgentCard";
import { Box } from "@mui/system";
import { PlusOne } from "@mui/icons-material";
import CreateAgentDialog from "../components/dialogs/CreateAgentDialog";
import Loading from "../components/Loading";
import { useAgents } from "../contexts/AgentsContext";
const newAgentBaseModel = {
  sex: "",
  name: "",
};
const Agents = () => {
  const { loading, data, upsertAgent, error } = useAgents();
  const [showInactive, setShowInactive] = useState(false);
  const { errorSnackbar, successSnackbar } = useSnackbar();
  const [createAgentDialogOpen, setCreateAgentDialogOpen] = useState(false);
  const [agentUpdateModel, setAgentUpdateModel] = useState({
    ...newAgentBaseModel,
  });

  useEffect(() => {
    if (error) {
      errorSnackbar(error);
    }
  }, [error]);

  const handleAddNewAgent = () => {
    setAgentUpdateModel({ ...newAgentBaseModel });
    setCreateAgentDialogOpen(true);
  };

  const handleEditAgent = (agent) => {
    setAgentUpdateModel(agent);
    setCreateAgentDialogOpen(true);
  };

  const handleDeleteAgent = async (agent) => {
    await handleAgentUpsert({ id: agent.id, deleted: true });
  };

  const handleAgentUpsert = async (agent) => {
    const operation = await upsertAgent(agent);
    successSnackbar(
      "Your agent was {action} successfully!".replace("{action}", operation)
    );
    setCreateAgentDialogOpen(false);
    setAgentUpdateModel({ ...newAgentBaseModel });
  };

  const handleActiveFilter = (event) => {
    setShowInactive(event.target.checked);
  };

  return (
    <Layout>
      <CreateAgentDialog
        updateModel={agentUpdateModel}
        open={createAgentDialogOpen}
        onClose={() => {
          setCreateAgentDialogOpen(false);
        }}
        onAgentUpsert={handleAgentUpsert}
      />
      <Container
        sx={{
          my: 4,
        }}
      >
        <Typography variant="h4" color="primary">
          Agents
        </Typography>
        <Typography> This screen contains all the agents</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Box display="flex" mb={2} alignItems="flex-end">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleActiveFilter}
                  checked={showInactive}
                />
              }
              label="Show inactive agents"
            />
          </Box>
          <Box display="flex" alignItems="flex-end">
            <Button
              onClick={handleAddNewAgent}
              sx={{
                color: "white",
                my: 2,
              }}
              startIcon={<PlusOne />}
              variant="contained"
            >
              Add new
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            my: 1,
            justifyContent: "space-between",
          }}
        >
          <Loading open={loading} />
          {data && (
            <Grid container spacing={2}>
              {data
                ?.filter((x) => (showInactive ? true : !x.deleted))
                .map((x) => (
                  <Grid key={x.id} item xs={4}>
                    <AgentCard
                      onEditAgent={() => handleEditAgent(x)}
                      onDeleteAgent={() => handleDeleteAgent(x)}
                      agent={x}
                      key={x.id}
                    />
                  </Grid>
                ))}
              {!loading && !error && !data?.length && (
                <>Create your first agent!</>
              )}
            </Grid>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default Agents;
