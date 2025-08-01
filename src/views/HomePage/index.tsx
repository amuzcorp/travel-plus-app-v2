import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "src/store";
import styled from "styled-components";

import { cityRowItemKey } from "../../constants/globalConstant";
import HomeSection from "../../entities/homeSection/HomeSection";
import CarouselRow from "./components/CarouselRow/CarouselRow";
import CityRow from "./components/CityRow/CityRow";
import CountryRow from "./components/CountryRow/CountryRow";
import DealsRow from "./components/DealsRow/DealsRow";
import FavoriteRow from "./components/FavoriteRow/FavoriteRow";
import PanoramaRow from "./components/PanoramaRow/PanoramaRow";

const HomePage: React.FC = React.memo(() => {
  const citySection = useSelector((state: RootState) =>
    state.home.citySection
      ? HomeSection.fromJson(cityRowItemKey, state.home.citySection)
      : null
  );

  return (
    <HomeWrapper id={"home-main-container"}>
      <CarouselRow />
      {citySection && <CityRow section={citySection} />}
      <FavoriteRow />
      <DealsRow />
      <PanoramaRow />
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
