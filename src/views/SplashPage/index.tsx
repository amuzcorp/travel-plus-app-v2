import React, { useEffect, useMemo } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import $L from "@enact/i18n/$L";

import splashLottieAnimation from "../../../assets/lottie/splash_luggage.json";
import { speakIfAudioGuidanceOn } from "../../utils/audioGuidance";

const SplashContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  //   const { showSpinner } = useSpinner();

  const lottieOptions = useMemo(
    () => ({
      loop: false,
      play: true,
      style: { width: "40%", height: "40%" },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      speakIfAudioGuidanceOn({ text: $L("common.lgTravelPlus") });
    }, 500);

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    // TODO
    // api 호출 (Spinner 띄우기)
    // showSpinner();
    // 호출 성공/실패에 따라 Home or FullScreenErrorPage로 이동
  }, [navigate]);

  return (
    <SplashContainer>
      <Lottie animationData={splashLottieAnimation} {...lottieOptions} />
    </SplashContainer>
  );
};

export default SplashPage;
