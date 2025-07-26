import React from "react";

import styled from "styled-components";
import CarouselRow from "./components/CarouselRow";

const HomePage: React.FC = React.memo(() => {
  return (
    <HomeWrapper>
      <CarouselRow />
    </HomeWrapper>
  );
});

export default HomePage;

const HomeWrapper = styled.div`
  margin-left: 130px;

  &:not(:last-child) {
    margin-bottom: 90px;
  }
`;
