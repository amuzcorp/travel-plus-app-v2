import React, { useEffect, useMemo } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import splashLottieAnimation from "../../../assets/lottie/splash_luggage.json";
import { speak } from "../../utils/audioGuidance";
import { translate } from "../../utils/translate";

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

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
      speak(translate("common.lgTravelPlus"));
    }, 500);

    setTimeout(() => {
      navigate("/home", { replace: true });
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

const SplashContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
