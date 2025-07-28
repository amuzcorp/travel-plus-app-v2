import React from "react";

import { I18nContextDecorator } from "@enact/i18n/I18nDecorator";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import SpotlightRootDecorator from "@enact/spotlight/SpotlightRootDecorator";

import { Outlet } from "react-router-dom";
import useInitSystemInfo from "../hooks/useInitSystemInfo";
import useLocaleChange from "../hooks/useLocaleChange";
import useNetworkMonitor from "../hooks/useNetworkMonitor";

const RootContainer = SpotlightRootDecorator({}, `div`);

const App: React.FC = () => {
  useLocaleChange(); // 언어 변경 감지
  useNetworkMonitor(); // 네트워크 상태 감지
  useInitSystemInfo(); // TV 시스템 정보(webOS 6.0 여부 등) 초기화, 계정 정보 초기화

  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }

  return (
    // <div style={{ width: "100px", height: "200px", background: "orange" }}>
    //   hello
    // </div>

    <RootContainer>
      <Outlet />
    </RootContainer>
  );
};

export default I18nContextDecorator(ThemeDecorator(App));
