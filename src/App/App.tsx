import React, { useEffect } from "react";

import { I18nContextDecorator } from "@enact/i18n/I18nDecorator";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import SpotlightRootDecorator from "@enact/spotlight/SpotlightRootDecorator";

import Spotlight from "@enact/spotlight";
import { Outlet } from "react-router-dom";

import ApiProvider from "../core/api/ApiProvider";
import useLocaleChange from "../hooks/useLocaleChange";
import useNetworkMonitor from "../hooks/useNetworkMonitor";

const RootContainer = SpotlightRootDecorator({}, `div`);

const App: React.FC = () => {
  useLocaleChange(); // 언어 변경 감지
  useNetworkMonitor(); // 네트워크 상태 감지

  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }

  useEffect(() => {
    Spotlight.initialize({ preventScroll: true });
  }, []);

  return (
    <ApiProvider>
      <RootContainer>
        <Outlet />
      </RootContainer>
    </ApiProvider>
  );
};

export default I18nContextDecorator(ThemeDecorator(App));
