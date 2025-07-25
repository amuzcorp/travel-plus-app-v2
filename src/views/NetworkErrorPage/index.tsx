import React, { useEffect } from "react";
import styled from "styled-components";

import $L from "@enact/i18n/$L";
import Spotlight from "@enact/spotlight";

import ErrorIcon from "../../../assets/icons/ErrorIcon";
import RectangleButton from "../../components/Buttons/RectangleButton/RectangleButton";
import Spacing from "../../components/Spacing/Spacing";
import Text from "../../components/Texts/Text";
import { useSpinner } from "../../hooks/useSpinner";
import { speakIfAudioGuidanceOn } from "../../utils/audioGuidance";
import { rem } from "../../utils/rem";

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
      speakIfAudioGuidanceOn({ text: $L("loading.animation") });
    }
  }, [start]);

  return (
    <NetworkErrorContainer>
      <ContentWrapper>
        <ErrorIcon />
        <Spacing size={40} />
        <div
          style={{
            height: rem(63),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text textStyle="headerXlSb">{$L("errors.networkError")}</Text>
        </div>
        <Spacing size={10} />
        <div
          style={{
            height: rem(39),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text textStyle="titleLgRg">{$L("errors.networkRetry")}</Text>
        </div>
        <Spacing size={110} />
        <RectangleButton disabled={true} speaker={$L("common.retry") + " " + $L("common.button")}>
          {$L("common.retry")}
        </RectangleButton>
        <Spacing size={20} />
        <RectangleButton speaker={$L("errors.networkSettings") + " " + $L("common.button")}>
          {$L("errors.networkSettings")}
        </RectangleButton>
        <Spacing size={20} />
        <RectangleButton speaker={$L("navigation.exitApp") + " " + $L("common.button")}>
          {$L("navigation.exitApp")}
        </RectangleButton>
      </ContentWrapper>
    </NetworkErrorContainer>
  );
});

export default NetworkErrorPage;
