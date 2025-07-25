import React, { useEffect } from "react";
import styled from "styled-components";

import Spotlight from "@enact/spotlight";

import ErrorIcon from "../../../assets/icons/ErrorIcon";
import RectangleButton from "../../components/Buttons/RectangleButton/RectangleButton";
import Spacing from "../../components/Spacing/Spacing";
import Text from "../../components/Texts/Text";
import { useSpinner } from "../../hooks/useSpinner";
import { speakIfAudioGuidanceOn } from "../../utils/audioGuidance";
import { rem } from "../../utils/rem";
import { translate } from "../../utils/translate";

const NetworkErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${rem(87)};
  height: 100vh;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${rem(87)});
`;

const NetworkErrorPage = React.memo(() => {
  const { start } = useSpinner();

  useEffect(() => {
    if (start) {
      const spottables = Spotlight.getSpottableDescendants("splash");
      if (spottables.length === 0) return;

      Spotlight.focus(spottables[0]);
      speakIfAudioGuidanceOn({ text: translate("loading.animation") });
    }
  }, [start]);

  return (
    <NetworkErrorContainer>
      <ContentWrapper>
        <ErrorIcon />
        <Spacing size={40} />

        <Text textStyle="headerXlSb">{translate("errors.networkError")}</Text>
        <Spacing size={10} />
        <Text textStyle="titleLgRg">{translate("errors.networkRetry")}</Text>
        <Spacing size={110} />

        <RectangleButton
          disabled
          speaker={translate("common.retry") + " " + translate("common.button")}
        >
          {translate("common.retry")}
        </RectangleButton>
        <Spacing size={20} />
        <RectangleButton
          speaker={translate("errors.networkSettings") + " " + translate("common.button")}
        >
          {translate("errors.networkSettings")}
        </RectangleButton>
        <Spacing size={20} />
        <RectangleButton
          speaker={translate("navigation.exitApp") + " " + translate("common.button")}
        >
          {translate("navigation.exitApp")}
        </RectangleButton>
      </ContentWrapper>
    </NetworkErrorContainer>
  );
});

export default NetworkErrorPage;
