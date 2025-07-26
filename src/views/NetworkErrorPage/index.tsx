import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import { useNavigate } from "react-router-dom";

import ErrorIcon from "../../../assets/icons/ErrorIcon";
import RectangleButton from "../../components/Buttons/RectangleButton/RectangleButton";
import Spacing from "../../components/Spacing/Spacing";
import Text from "../../components/Texts/Text";
import { useSpinner } from "../../hooks/useSpinner";
import { exitApp } from "../../utils/exitApp";
import { checkNetworkStatus, launchNetworkSettings } from "../../utils/networkStatus";
import { rem } from "../../utils/rem";
import { translate } from "../../utils/translate";

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${rem(87)};
  height: 100vh;
  box-sizing: border-box;
`;

const SpotlightNetworkErrorContainer = SpotlightContainerDecorator(
  { restrict: "self-only" },
  ContainerBase
);

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${rem(87)});
`;

const NetworkErrorPage = React.memo(() => {
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();

  useEffect(() => {
    const spottables = Spotlight.getSpottableDescendants("networkError");
    if (spottables.length > 0) {
      Spotlight.focus(spottables[0]);
    }
  }, []);

  const handleRetry = useCallback(async () => {
    showSpinner();

    const startTime = Date.now();
    const timeout = 5000;
    let connected = false;

    while (Date.now() - startTime < timeout) {
      const isOnline = await checkNetworkStatus();
      if (isOnline) {
        connected = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (connected) {
      setTimeout(() => {
        hideSpinner();
        navigate(-1);
      }, 3000);
    } else {
      hideSpinner();
      // spinner 종료 후 포커스 복원
      setTimeout(() => {
        const spottables = Spotlight.getSpottableDescendants("networkError");
        if (spottables.length > 0) {
          Spotlight.focus(spottables[0]);
        }
      }, 100);
    }
  }, [hideSpinner, navigate, showSpinner]);

  const handleOpenSettings = useCallback(async () => {
    await launchNetworkSettings();
  }, []);

  const handleExitApp = useCallback(async () => {
    await exitApp();
  }, []);

  return (
    <SpotlightNetworkErrorContainer spotlightId="networkError" spotlightRestrict="self-only">
      <ContentWrapper>
        <ErrorIcon />
        <Spacing size={40} />

        <Text textStyle="headerXlSb">{translate("errors.networkError")}</Text>
        <Spacing size={10} />
        <Text textStyle="titleLgRg">{translate("errors.networkRetry")}</Text>
        <Spacing size={110} />

        <RectangleButton
          onClick={handleRetry}
          speaker={translate("common.retry") + " " + translate("common.button")}
          data-spot-id={"network-error-retry"}
        >
          {translate("common.retry")}
        </RectangleButton>
        <Spacing size={20} />
        <RectangleButton
          onClick={handleOpenSettings}
          speaker={translate("errors.networkSettings") + " " + translate("common.button")}
          data-spot-id={"network-error-setting"}
        >
          {translate("errors.networkSettings")}
        </RectangleButton>
        <Spacing size={20} />
        <RectangleButton
          onClick={handleExitApp}
          speaker={translate("navigation.exitApp") + " " + translate("common.button")}
          data-spot-id={"network-error-exit"}
        >
          {translate("navigation.exitApp")}
        </RectangleButton>
      </ContentWrapper>
    </SpotlightNetworkErrorContainer>
  );
});

export default NetworkErrorPage;
