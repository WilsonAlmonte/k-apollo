import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getTimeLabel } from "../utils/dateUtils";

const styles = {
  tableCell: {
    p: 0,
  },
  tableLabel: {
    fontWeight: "600",
  },
  tableGroupItem: {
    p: 0.5,
    border: 1,
    borderColor: "grey.300",
    borderTop: 0,
    borderLeft: 0,
    "&:last-child, &:last-child": { borderBottom: 0 },
  },
};

export default function DailyReport({ data: rows, onCallUpdate }) {
  const getTotalCalls = () => {
    let result = 0;
    rows.forEach((x) => {
      result += x.calls?.length || 0;
    });
    return result;
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell color="primary" sx={styles.tableLabel} align="center">
              Agent
            </TableCell>
            <TableCell sx={styles.tableLabel} align="center">
              SID
            </TableCell>
            <TableCell sx={styles.tableLabel} align="center">
              Time
            </TableCell>
            <TableCell sx={styles.tableLabel} align="center">
              Status
            </TableCell>
            <TableCell sx={styles.tableLabel} align="center">
              Actions
            </TableCell>
            <TableCell sx={styles.tableLabel} align="center">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .filter((row) => row.calls)
            .map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center" component="th" scope="row">
                  <Typography variant="subtitle1"> {row.name}</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    ...styles.tableCell,
                  }}
                  align="center"
                >
                  <Box
                    component="div"
                    sx={{
                      ...styles.tableGroup,
                      borderLeft: 1,
                      borderColor: "grey.300",
                    }}
                  >
                    {row.calls.map((x, index) => (
                      <Box
                        key={`${x.sid}-${index}`}
                        component="div"
                        sx={styles.tableGroupItem}
                      >
                        {x.sid}
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell sx={styles.tableCell} align="center">
                  <Box component="div" sx={styles.tableGroup}>
                    {row.calls.map((x, index) => (
                      <Box
                        key={`${x.sid}-${index}`}
                        component="div"
                        sx={styles.tableGroupItem}
                      >
                        {getTimeLabel(x.time)}
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell sx={styles.tableCell} align="center">
                  <Box component="div" sx={styles.tableGroup}>
                    {row.calls.map((x, index) => (
                      <Box
                        key={`${x.sid}-${index}`}
                        component="div"
                        sx={styles.tableGroupItem}
                      >
                        <Typography
                          variant="body2"
                          color={x.done ? "primary" : "text.info"}
                          sx={{ fontWeight: "700" }}
                        >
                          {x.done ? "Done" : "Pending"}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell sx={styles.tableCell} align="center">
                  <Box component="div" sx={styles.tableGroup}>
                    {row.calls.map((x, index) => (
                      <Box
                        key={`${x.sid}-${index}`}
                        onClick={() => onCallUpdate(x)}
                        component="div"
                        sx={{
                          ...styles.tableGroupItem,
                          cursor: "pointer",
                          height: "100%",
                          "&:hover": (theme) => ({
                            backgroundColor: theme.palette.primary.light,
                          }),
                          "&:hover p": (theme) => ({
                            color: "white",
                          }),
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="p"
                        >
                          <Edit sx={{ fontSize: 14 }} /> Edit
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    {row.calls.length}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!rows.filter((row) => row.calls).length && (
        <Box>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ m: 1, textAlign: "center", mt: 3 }}
          >
            There's no call registered in this date
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          textAlign: "right",
          p: 2,
        }}
      >
        Total Calls: {getTotalCalls()}
      </Box>
    </TableContainer>
  );
}
