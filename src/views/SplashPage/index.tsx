import React, { useEffect, useMemo } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import splashLottieAnimation from "../../assets/lottie/splash_luggage.json";
import useInitSystemInfo from "../../hooks/useInitSystemInfo";
import { speak } from "../../utils/audioGuidance";
import { translate } from "../../utils/translate";

const SplashPage: React.FC = () => {
  useInitSystemInfo(); // TV 시스템 정보(webOS 6.0 여부 등) 초기화, 계정 정보 초기화

  // const homeApi = useHomeApi();
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

    // const data = homeApi.getHomeSections();

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
