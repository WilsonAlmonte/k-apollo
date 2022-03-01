import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const CreateAgentDialog = ({ onAgentUpsert, updateModel, ...dialogProps }) => {
  const [agentModel, setAgentModel] = useState(updateModel);
  const [formError, setFormError] = useState();
  useEffect(() => {
    setAgentModel({ ...updateModel });
  }, [updateModel]);
  const handleChange =
    (propName) =>
    ({ target }) => {
      if (formError) setFormError(false);
      setAgentModel({ ...agentModel, [propName]: target.value });
    };

  const handleAgentCreation = async () => {
    const isValid = agentModel.sex && agentModel.name;
    if (isValid) {
      await onAgentUpsert(agentModel);
      return;
    }
    setFormError(true);
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle> {!agentModel.id ? "New Agent" : "Update Agent"}</DialogTitle>
      <DialogContent sx={{ minWidth: "350px" }}>
        {formError && (
          <Typography color="red">All the fields must be filled</Typography>
        )}
        <TextField
          autoFocus
          margin="normal"
          id="name"
          label="Agent Name"
          type="text"
          fullWidth
          variant="outlined"
          value={agentModel["name"]}
          onChange={handleChange("name")}
        />
        <FormControl margin="normal" fullWidth>
          <InputLabel id="sex-select-label">Sex</InputLabel>
          <Select
            labelId="sex-select-label"
            value={agentModel["sex"]}
            onChange={handleChange("sex")}
            label="Sex"
          >
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="F">F</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogProps.onClose}>Cancel</Button>
        <Button onClick={handleAgentCreation}>
          {!agentModel.id ? "Create" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAgentDialog;
