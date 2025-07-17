import React from "react";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import { Cell, Row } from "@enact/ui/Layout";
import { Outlet } from "react-router-dom";
import GlobalNavigationBar from "../components/GlobalNavigationBar/GlobalNavigationBar";

const App: React.FC = () => {
  return (
    <Row>
      <Cell>
        <GlobalNavigationBar />
      </Cell>
      <Cell
        style={{
          marginLeft: "130px",
        }}
      >
        <Outlet />
      </Cell>
    </Row>
  );
};

export default ThemeDecorator(App);