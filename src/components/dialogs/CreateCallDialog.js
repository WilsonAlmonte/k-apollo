import { DesktopDatePicker } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAgents } from "../../contexts/AgentsContext";
import { getTimeLabel } from "../../utils/dateUtils";

const CreateCallDialog = ({ onCallUpsert, updateModel, ...dialogProps }) => {
  const [callModel, setCallModel] = useState(updateModel);
  const { data: agents } = useAgents();
  const [formError, setFormError] = useState();
  useEffect(() => {
    const timeLabel = getTimeLabel(updateModel.time);
    const [hours, minutes, seconds] = timeLabel.split(":");
    setCallModel({
      ...updateModel,
      date: updateModel.id ? updateModel.date.toDate() : updateModel.date,
      hours,
      minutes,
      seconds,
    });
  }, [updateModel]);
  const handleChange =
    (propName) =>
    ({ target }) => {
      if (formError) setFormError(false);
      setCallModel({ ...callModel, [propName]: target.value });
    };
  const handleCallCreation = async () => {
    const { hours, minutes, seconds } = callModel;
    callModel.time =
      parseInt(hours || 0, ) * 60 +
      parseInt(minutes || 0) +
      (parseInt(seconds || 0) !== 0 ? parseInt(seconds || 0) / 60 : 0);
    console.log(callModel.time)
    const isValid =
      callModel.agentId && callModel.sid && parseInt(callModel.time) > 0;
    if (isValid) {
      await onCallUpsert(callModel);
      return;
    }
    setFormError(true);
  };
  return (
    <Dialog {...dialogProps}>
      <DialogTitle> {!callModel.id ? "New Call" : "Update Call"}</DialogTitle>
      <DialogContent sx={{ minWidth: "350px" }}>
        {formError && (
          <Typography color="red">All the fields must be filled</Typography>
        )}
        <DesktopDatePicker
          label="Call Date"
          maxDate={new Date()}
          inputFormat="MM/dd/yyyy"
          value={callModel["date"]}
          onChange={(newValue) =>
            handleChange("date")({ target: { value: newValue } })
          }
          renderInput={(params) => (
            <TextField sx={{ mt: 1 }} margin="normal" fullWidth {...params} />
          )}
        />
        <TextField
          autoFocus
          margin="normal"
          id="name"
          label="SID"
          type="text"
          fullWidth
          variant="outlined"
          value={callModel["sid"]}
          onChange={handleChange("sid")}
        />
        <FormControl margin="normal" fullWidth>
          <InputLabel id="agent-select-label">Agent</InputLabel>
          <Select
            labelId="agent-select-label"
            value={callModel["agentId"]}
            onChange={handleChange("agentId")}
            label="Agent"
          >
            {agents
              .filter((x) => !x.deleted || x.id === callModel.agentId)
              .map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={callModel["done"]}
            onChange={handleChange("done")}
            label="Status"
          >
            <MenuItem value={true}>Done</MenuItem>
            <MenuItem value={false}>Pending</MenuItem>
          </Select>
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <Typography>Working time</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="normal"
                id="hour"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
                label="Hours"
                variant="outlined"
                value={callModel["hours"]}
                onChange={handleChange("hours")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="normal"
                id="minutes"
                label="Minutes"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
                variant="outlined"
                value={callModel["minutes"]}
                onChange={handleChange("minutes")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="normal"
                id="seconds"
                inputProps={{ min: 0 }}
                type="number"
                label="Seconds"
                fullWidth
                variant="outlined"
                value={callModel["seconds"]}
                onChange={handleChange("seconds")}
              />
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogProps.onClose}>Cancel</Button>
        <Button onClick={handleCallCreation}>
          {!callModel.id ? "Create" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCallDialog;
