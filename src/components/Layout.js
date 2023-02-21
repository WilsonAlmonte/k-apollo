import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LinkButton from "./LinkButton";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar variant="regular" sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              noWrap
              sx={{ fontWeight: "bold", color: "white" }}
              component="div"
            >
              K-APOLLO
            </Typography>
            <Box>
              <LinkButton path="/">Home</LinkButton>
              <LinkButton path="/agents">Agents</LinkButton>
              <LinkButton path="/excel">Excel Converter</LinkButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
