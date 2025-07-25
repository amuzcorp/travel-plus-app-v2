import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import React from "react";
import styled from "styled-components";

import GradientBottomComponent from "../../../../assets/gradients/GradientCarouselBottom";
import GradientLeftComponent from "../../../../assets/gradients/GradientCarouselLeft";
import Spacing from "../../../components/Spacing/Spacing";
import Text from "../../../components/Texts/Text";

export default React.memo(() => {
  return (
    <CarouselContainer>
      {/* Video */}
      <VideoWrapper />

      {/* Gradients */}
      <GradientLeft>
        <GradientLeftComponent
          width="67vw"
          height="100%"
          preserveAspectRatio="none"
        />
      </GradientLeft>
      <GradientBottom>
        <GradientBottomComponent
          width="100vw"
          height="100%"
          preserveAspectRatio="none"
        />
      </GradientBottom>

      {/* Contents */}
      <ContentWrapper>
        <HeaderText textStyle={"headerHugeSb"}>
          ioewjf;oiqwejfio;asdjflkjekl;fjals;d
        </HeaderText>
        <Spacing size={16} />
        <InfoWrapper>
          <div>국가</div>
          <div>장소</div>
          <div>4K</div>
        </InfoWrapper>
      </ContentWrapper>
    </CarouselContainer>
  );
});

const CarouselWrapper = styled.div`
  position: relative;

  margin-left: -130px;

  width: 100vw;
  height: 100vh;

  background: red;
`;

const CarouselContainer = SpotlightContainerDecorator(CarouselWrapper);

const VideoWrapper = styled.div`
  position: absolute;

  width: 100vw;
  height: 100vh;
`;

const GradientBottom = styled.div`
  position: absolute;
  bottom: 0;

  width: 100vw;
  height: 40vh;

  overflow: hidden;
`;

const GradientLeft = styled.div`
  position: absolute;
  width: 67vw;
  height: 100vh;

  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 150px;
  left: 180px;

  width: 817px;
  height: fit-content;
`;

const HeaderText = styled(Text)``;

const InfoWrapper = styled.div`
  display: flex;
  & :not(:last-child) {
    display: flex;
    align-items: center;

    &::after {
      display: block;
      content: "";

      width: 6px;
      height: 6px;
      background: ${({ theme }) => theme.colors.deactive.normal};

      margin: 0 10px;
      border-radius: 50%;
    }
  }
`;
