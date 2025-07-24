import React, { useEffect, useMemo } from "react";
import Lottie from "react-lottie-player";
import styled from "styled-components";

import $L from "@enact/i18n/$L";
import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import Spottable from "@enact/spotlight/Spottable";

import spinnerAnimation from "../../../assets/lottie/lottie_spinner.json";
import { useSpinner } from "../../hooks/useSpinner";
import { speakIfAudioGuidanceOn } from "../../utils/audioGuidance";

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => `${theme.zIndex.spinner}`};
`;

const SpotlightSpinnerContainer = SpotlightContainerDecorator(
  { restrict: "self-only" },
  SpinnerContainer
);

const SpottableLottie = Spottable(Lottie);

const Spinner = React.memo(() => {
  const { start } = useSpinner();

  useEffect(() => {
    if (start) {
      const spottables = Spotlight.getSpottableDescendants("splash");
      if (spottables.length === 0) return;

      Spotlight.focus(spottables[0]);
      speakIfAudioGuidanceOn({ text: $L("loading.animation") });
    }
  }, [start]);

  const lottieOptions = useMemo(
    () => ({
      loop: true,
      play: true,
      style: { width: "30%", height: "30%" },
    }),
    []
  );

  return start ? (
    <SpotlightSpinnerContainer spotlightId="splash" spotlightRestrict="self-only">
      <SpottableLottie animationData={spinnerAnimation} {...lottieOptions} />
    </SpotlightSpinnerContainer>
  ) : null;
});

export default Spinner;
