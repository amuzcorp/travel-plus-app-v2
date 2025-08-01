import React, { useCallback, useEffect, useMemo } from "react";
import Lottie from "react-lottie-player";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useHomeApi } from "../../api/home/HomeApiProvider";
import splashLottieAnimation from "../../assets/lottie/splash_luggage.json";
import { cityRowItemKey } from "../../constants/globalConstant";
import CityItem from "../../entities/HomeSection/CityItem";
import HomeItem from "../../entities/HomeSection/HomeItem";
import useInitSystemInfo from "../../hooks/useInitSystemInfo";
import useSpeak from "../../hooks/useSpeak";
import { setCitySection } from "../../store/slices/homeSlice";
import preloadImage from "../../utils/preloadImage";
import { translate } from "../../utils/translate";

const SplashPage: React.FC = () => {
  const homeApi = useHomeApi();
  useInitSystemInfo(); // TV 시스템 정보(webOS 6.0 여부 등) 초기화, 계정 정보 초기화

  const { speak } = useSpeak();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lottieOptions = useMemo(
    () => ({
      loop: false,
      play: true,
      style: { width: "40%", height: "40%" },
    }),
    []
  );

  // const {data, isLoading, error} = useQuery({queryKey: ['home'], queryFn: homeApi.getHomeSections()})

  const initDefaultData = useCallback(async () => {
    HomeItem.register(cityRowItemKey, CityItem);

    const homeSections = await homeApi.getHomeSections();

    for (let i = 0; i < homeSections.length; i++) {
      const homeSection = homeSections[i];

      switch (homeSection.sectionType) {
        case "city_ani":
          dispatch(setCitySection(homeSection));

          for (let j = 0; j < homeSection.items.length; j++) {
            const item = homeSection.items[j] as CityItem;

            await preloadImage(item.blurredImageUrl);
            await preloadImage(item.staticMapUrl);
            await preloadImage(item.thumbnailImageUrl);
          }

          break;

        default:
          break;
      }
    }

    await preloadImage(
      "https://travel-plus-cms.dev.amuz.kr/storage/assets/Travel Deals & More-gil.png"
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate("/home", { replace: true });

    // setTimeout(() => {
    //   navigate("/home", { replace: true });
    // }, 1000);
  }, [dispatch, homeApi, navigate]);

  useEffect(() => {
    setTimeout(() => {
      speak(translate("common.lgTravelPlus"));
    }, 500);

    initDefaultData();

    // TODO
    // api 호출 (Spinner 띄우기)
    // showSpinner();
    // 호출 성공/실패에 따라 Home or FullScreenErrorPage로 이동
  }, [speak, initDefaultData]);

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
