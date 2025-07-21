import React from "react";

import { I18nContextDecorator } from "@enact/i18n/I18nDecorator";
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

export default I18nContextDecorator(ThemeDecorator(App));
