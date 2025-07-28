import React from "react";
import { Outlet } from "react-router-dom";

import { Cell, Row } from "@enact/ui/Layout";

import GlobalNavigationBar from "../components/GlobalNavigationBar/GlobalNavigationBar";

export default React.memo(() => {
  return (
    <Row>
      <Cell shrink>
        <GlobalNavigationBar />
      </Cell>
      <Cell>
        <Outlet />
      </Cell>
    </Row>
  );
});
