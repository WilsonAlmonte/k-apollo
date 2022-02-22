import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Agents from "./screens/Agents";
import Home from "./screens/Home";
const Routes = () => {
  return (
    <Switch>
      <Route index element={<Home />} />
      <Route path="/agents" element={<Agents />} />
    </Switch>
  );
};

export default Routes;
