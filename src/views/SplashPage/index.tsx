import React, { useCallback, useEffect, useMemo } from "react";
import Lottie from "react-lottie-player";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuthApi } from "../../api/auth/AuthApiProvider";
import { useHomeApi } from "../../api/home/HomeApiProvider";
import { useLunaApi } from "../../api/luna/LunaApiProvider";
import splashLottieAnimation from "../../assets/lottie/splash_luggage.json";
import {
  adsRowItemKey,
  carouselRowItemKey,
  cityRowItemKey,
  contentRowItemKey,
  countryRowItemKey,
  ottRowItemKey,
} from "../../constants/globalConstant";
import AdsItem from "../../entities/HomeSection/AdsItem";
import BannerItem from "../../entities/HomeSection/BannerItem";
import CityItem from "../../entities/HomeSection/CityItem";
import ContentItem from "../../entities/HomeSection/ContentItem";
import CountryItem from "../../entities/HomeSection/CountryItem";
import HomeItem from "../../entities/HomeSection/HomeItem";
import HomeSection from "../../entities/HomeSection/HomeSection";
import OttItem from "../../entities/HomeSection/OttItem/OttItem";
import useSpeak from "../../hooks/useSpeak";

import AccountManager from "../../services/AccountService";
import TvService from "../../services/TvService";
import { setAccountState } from "../../store/slices/accountSlice";
import {
  setCarouselSection,
  setCitySection,
  setCountrySection,
  setCurationSection,
  setDealSection,
  setFavoriteSection,
  setFeatureSection,
  setOttSection,
  setPanoramaSection,
} from "../../store/slices/homeSlice";
import { setTVSystemInfo } from "../../store/slices/tvSystemSlice";
import preloadImage from "../../utils/preloadImage";
import { translate } from "../../utils/translate";

const SplashPage: React.FC = () => {
  const homeApi = useHomeApi();
  const authApi = useAuthApi();
  const lunaApi = useLunaApi();

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

  const initDefaultData = useCallback(async () => {
    // TV 시스템 정보 초기화
    const systemInfo = await TvService.getSystemInfo(lunaApi);
    dispatch(setTVSystemInfo(systemInfo));

    // 계정 정보 초기화(webOS 6.0 여부에 따라 다른 방식으로 계정 정보를 가져오기 때문에 TV 시스템 정보 초기화 후에 계정 정보를 가져와야 함)
    const fetchResult = await AccountManager.fetchAccountInfo({
      authApi: authApi,
      lunaApi: lunaApi,
    });
    dispatch(setAccountState(fetchResult.account));

    // Home 메인 배너
    HomeItem.register(cityRowItemKey, CityItem);
    HomeItem.register(ottRowItemKey, OttItem);
    HomeItem.register(contentRowItemKey, ContentItem);
    HomeItem.register(adsRowItemKey, AdsItem);
    HomeItem.register(countryRowItemKey, CountryItem);
    HomeItem.register(carouselRowItemKey, BannerItem);

    const banners = await homeApi.getMainBanners();
    const carousel = HomeSection.empty();
    banners.map((banner) => carousel.items.push(banner));
    dispatch(setCarouselSection(carousel));

    const homeSections = await homeApi.getHomeSections();

    for (let i = 0; i < homeSections.length; i++) {
      const homeSection = homeSections[i];

      if (homeSection.sectionType === "city_ani") {
        dispatch(setCitySection(homeSection));
        
        for (let j = 0; j < homeSection.items.length; j++) {
          const item = homeSection.items[j] as CityItem;

          await preloadImage(item.blurredImageUrl);
          await preloadImage(item.staticMapUrl);
          await preloadImage(item.thumbnailImageUrl);
        }

      } else if (homeSection.sectionType === "ott_ani123") {
        dispatch(setOttSection(homeSection));
      } else if (homeSection.sectionType === "video" && homeSection.id === 3) {
        dispatch(setFavoriteSection(homeSection));
      } else if (homeSection.sectionType === "ads") {
        dispatch(setDealSection(homeSection));
      } else if (homeSection.sectionType === "panorama123") {
        dispatch(setPanoramaSection(homeSection));
      } else if (homeSection.sectionType === "featured") {
        dispatch(setFeatureSection(homeSection));
      } else if (homeSection.sectionType === "video" && homeSection.id === 7) {
        dispatch(setCurationSection(homeSection));
      } else if (homeSection.sectionType === "country_mini") {
        dispatch(setCountrySection(homeSection));
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
  }, [authApi, dispatch, homeApi, lunaApi, navigate]);

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
