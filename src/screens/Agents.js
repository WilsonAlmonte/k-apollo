import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useAgents from "../hooks/useAgents";
import AgentCard from "../components/AgentCard";
import { Box } from "@mui/system";
import { PlusOne } from "@mui/icons-material";
const Agents = () => {
  const { loading, data, error, fetch } = useAgents();
  const [showInactive, setShowInactive] = useState(false);
  useEffect(() => {
    fetch(showInactive);
  }, [showInactive]);

  const handleActiveFilter = (event) => {
    setShowInactive(event.target.checked);
  };

  return (
    <Layout>
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
          {error && <h1>{error}</h1>}
          {loading && (
            <CircularProgress
              sx={{
                zIndex: 100,
                width: "100%",
              }}
              size={60}
              color="secondary"
            />
          )}
          {data && data?.map((x) => <AgentCard agent={x} key={x.id} />)}
        </Box>
      </Container>
    </Layout>
  );
};

export default Agents;
