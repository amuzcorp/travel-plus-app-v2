import React from "react";

import { I18nContextDecorator } from "@enact/i18n/I18nDecorator";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import { Outlet } from "react-router-dom";
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
