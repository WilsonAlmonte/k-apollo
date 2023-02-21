import {
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { read, utils, writeFileXLSX } from "xlsx";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Layout from "../components/Layout";
import pick from "lodash/pick";
const fileColumnNames = [
  "Patient ID",
  "Patient name",
  "Patient gender",
  "Patient DoB",
  "DoS",
  "Service address",
  "Referring facility",
  "Referring doctor",
  "Primary insurance",
  "Primary member ID",
  "Secondary insurance",
  "Secondary member ID",
];

const ExcelConverter = () => {
  const [currentFile, setCurrentFile] = useState();
  const [fileIsInProcess, setFileIsInProcess] = useState(false);
  const handleFileSubmission = (e) => {
    const file = e.target.files[0];
    setCurrentFile(file);
  };

  const processFile = async () => {
    setFileIsInProcess(true);
    const data = await currentFile.arrayBuffer();
    const workbook = read(data, {cellDates: true });
    var ws = workbook.Sheets[workbook.SheetNames[0]];
    const rows = utils.sheet_to_json(ws);
    const desiredValues = rows.map((r) => {
      return pick(r, fileColumnNames);
    });
    sheetToJson(desiredValues);
  };

  const sheetToJson = (desiredValues) => {
    const ws = utils.json_to_sheet(desiredValues);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, currentFile.name, { cellDates: true });
  };
  return (
    <Layout>
      <Container
        sx={{
          my: 4,
        }}
      >
        <Typography variant="h4" color="primary">
          Excel Converter
        </Typography>
        <Typography marginBottom={4}>
          Click the button upload the Excel and see how the magic happens
        </Typography>
        <TextField
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileSubmission}
          type={"file"}
          placeholder="Insert the excel file"
        />
        {fileIsInProcess && <LinearProgress />}
        {currentFile && (
          <Box marginTop={3}>
            <Button onClick={processFile} variant="contained">
              Process
            </Button>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default ExcelConverter;
