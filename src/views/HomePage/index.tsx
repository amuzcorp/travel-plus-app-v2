import React, { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import {
  adsRowItemKey,
  cityRowItemKey,
  contentRowItemKey,
  homeKeys,
} from "../../constants/globalConstant";
import HomeSection from "../../entities/HomeSection/HomeSection";
import { RootState } from "../../store";
import { setDefaultFocusKey } from "../../store/slices/gnbSlice";
import CarouselRow from "./components/CarouselRow/CarouselRow";
import CityRow from "./components/CityRow/CityRow";
import CountryRow from "./components/CountryRow/CountryRow";
import DealsRow from "./components/DealsRow/DealsRow";
import FavoriteRow from "./components/FavoriteRow/FavoriteRow";
import PanoramaRow from "./components/PanoramaRow/PanoramaRow";

const HomePage: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const citySection = useSelector((state: RootState) =>
    state.home.citySection
      ? HomeSection.fromJson(cityRowItemKey, state.home.citySection)
      : null
  );
  const favoriteSection = useSelector((state: RootState) =>
    state.home.favoriteSection
      ? HomeSection.fromJson(contentRowItemKey, state.home.favoriteSection)
      : null
  );
  const dealSection = useSelector((state: RootState) =>
    state.home.dealSection
      ? HomeSection.fromJson(adsRowItemKey, state.home.dealSection)
      : null
  );
  const panoramaSection = useSelector((state: RootState) =>
    state.home.panoramaSection
      ? HomeSection.fromJson(contentRowItemKey, state.home.panoramaSection)
      : null
  );

  const cityRow = useMemo(() => {
    return citySection && <CityRow section={citySection} />;
  }, [citySection]);

  const favoriteRow = useMemo(() => {
    return (
      favoriteSection &&
      favoriteSection.items.length > 0 && (
        <FavoriteRow section={favoriteSection} />
      )
    );
  }, [favoriteSection]);

  const dealsRow = useMemo(() => {
    return dealSection && <DealsRow section={dealSection} />;
  }, [dealSection]);

  const panoramaRow = useMemo(() => {
    return panoramaSection && <PanoramaRow section={panoramaSection} />;
  }, [panoramaSection]);

  useEffect(() => {
    dispatch(setDefaultFocusKey(homeKeys.carousel.containerKey));
  }, [dispatch]);

  return (
    <HomeWrapper id={"home-main-container"}>
      <CarouselRow />
      {cityRow}
      {favoriteRow}
      {dealsRow}
      {panoramaRow}
      <CountryRow />
    </HomeWrapper>
  );
});

export default HomePage;

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  /* overflow: hidden; */

  transition: transform ease 0.3s;

  > *:not(:last-child) {
    margin-bottom: 90px;
    scroll-snap-align: center;
  }

  > *:first-child {
    scroll-snap-align: start;
  }

  > *:last-child {
    scroll-snap-align: end;
  }
`;
