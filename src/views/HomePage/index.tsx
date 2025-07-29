import React from "react";

import styled from "styled-components";
import CarouselRow from "./components/CarouselRow/CarouselRow";
import CityRow from "./components/CityRow/CityRow";
import CountryRow from "./components/CountryRow/CountryRow";
import DealsRow from "./components/DealsRow/DealsRow";
import FavoriteRow from "./components/FavoriteRow/FavoriteRow";
import PanoramaRow from "./components/PanoramaRow/PanoramaRow";

const HomePage: React.FC = React.memo(() => {
  return (
    <HomeWrapper>
      <CarouselRow />
      <CityRow />
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
  height: 100wh;

  scroll-snap-type: y mandatory;
  overflow-y: scroll;

  /* overflow: hidden; */

  height: 100vh;

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
