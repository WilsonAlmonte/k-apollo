import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DailyReport from "../components/DailyReport";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import CreateCallDialog from "../components/dialogs/CreateCallDialog";
import { PlusOne } from "@mui/icons-material";
import useCallsReport from "../hooks/useCallsReport";
import Loading from "../components/Loading";
import { useSnackbar } from "../contexts/SnackbarContext";
const newCallBaseModel = {
  sid: "",
  agentId: "",
  time: 0,
  done: false,
  date: new Date(),
};
const Home = () => {
  const [upsertCallDialogOpen, setUpsertCallDialogOpen] = useState(false);
  const { loading, data, error, fetch, upsertCall } = useCallsReport();
  const [dateFilter, setDateFilter] = useState(new Date());
  const { errorSnackbar, successSnackbar } = useSnackbar();
  const [callUpsertModel, setCallUpsertModel] = useState({
    ...newCallBaseModel,
  });

  useEffect(() => {
    fetch(dateFilter.getTime());
  }, [dateFilter]);

  useEffect(() => {
    if (error) {
      errorSnackbar(error);
    }
  }, [error]);

  const handleDateFilterChange = (newValue) => {
    setDateFilter(newValue);
  };

  const handleCallUpdate = (call) => {
    setCallUpsertModel(call);
    setUpsertCallDialogOpen(true);
  };

  const handleCallUpsert = async (call) => {
    const operation = await upsertCall(call, dateFilter.getTime());
    successSnackbar(
      "Your agent was {action} successfully!".replace("{action}", operation)
    );
    setUpsertCallDialogOpen(false);
    setCallUpsertModel({ ...newCallBaseModel });
  };

  return (
    <Layout>
      <CreateCallDialog
        updateModel={callUpsertModel}
        open={upsertCallDialogOpen}
        onClose={() => {
          setCallUpsertModel({ ...newCallBaseModel });
          setUpsertCallDialogOpen(false);
        }}
        onCallUpsert={handleCallUpsert}
      />
      <Container
        sx={{
          my: 4,
        }}
      >
        <Typography variant="h4" color="primary">
          Daily Report
        </Typography>
        <Typography>
          This screen contains all the calls filtered by date!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Box display="flex" mt={4} mb={2} alignItems="flex-end">
            <DesktopDatePicker
              label="Report Date"
              maxDate={new Date()}
              inputFormat="MM/dd/yyyy"
              value={dateFilter}
              onChange={handleDateFilterChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box display="flex" alignItems="flex-end">
            <Button
              onClick={() => setUpsertCallDialogOpen(true)}
              sx={{
                color: "white",
                my: 2,
              }}
              startIcon={<PlusOne />}
              variant="contained"
            >
              Add Call
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Loading open={loading} />
          {data && <DailyReport onCallUpdate={handleCallUpdate} data={data} />}
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
