import React from "react";

import { I18nContextDecorator } from "@enact/i18n/I18nDecorator";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import { Cell, Row } from "@enact/ui/Layout";
import { Outlet } from "react-router-dom";
import GlobalNavigationBar from "../components/GlobalNavigationBar/GlobalNavigationBar";
import SpotlightRootDecorator from "@enact/spotlight/SpotlightRootDecorator";

const RootContainer = SpotlightRootDecorator({}, `div`);

const App: React.FC = () => {
  return (
    <RootContainer>
      <Outlet />
    </RootContainer>
  );
};

export default I18nContextDecorator(ThemeDecorator(App));
