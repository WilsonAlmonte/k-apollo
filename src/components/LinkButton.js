import { Button } from "@mui/material";
import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
const LinkButton = ({ path, children, ...rest }) => {
  let resolved = useResolvedPath(path);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavLink style={{ textDecoration: "none" }} to={path}>
      <Button
        color="primary"
        disableElevation
        {...rest}
        sx={{
          color: "white",
          fontWeight: match ? "bold" : "regular",
        }}
        className={match ? "font-weight-bold" : "null"}
      >
        {children}
      </Button>
    </NavLink>
  );
};

export default LinkButton;
