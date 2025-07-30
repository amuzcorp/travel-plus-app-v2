import SpotlightContainerDecorator, {
  SpotlightContainerDecoratorConfig,
} from "@enact/spotlight/SpotlightContainerDecorator";
import styled from "styled-components";

import MarqueeText from "../../../../components/Texts/MarqueeText";

const CarouselWrapper = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;

  background: red;
`;

const spotlightConfig: SpotlightContainerDecoratorConfig = {
  restrict: "self-first",
};

export const CarouselContainer = SpotlightContainerDecorator(
  spotlightConfig,
  CarouselWrapper
);

export const VideoWrapper = styled.div`
  position: absolute;

  width: 100vw;
  height: 100vh;
`;

export const GradientBottom = styled.div`
  position: absolute;
  bottom: 0;

  width: 100vw;
  height: 40vh;

  overflow: hidden;
`;

export const GradientLeft = styled.div`
  position: absolute;
  width: 67vw;
  height: 100vh;

  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  position: absolute;
  top: 150px;
  left: 180px;

  width: 817px;
  height: fit-content;
`;

export const HeaderText = styled(MarqueeText)``;

export const InfoWrapper = styled.div`
  display: flex;

  & :not(:last-child) {
    display: flex !important;
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

export const MoreWrapper = styled.div`
  height: 81px;
`;

export const MapWrapper = styled.div`
  margin: 0 33px;
`;

export const ArrowButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;

  transform: translateY(-50%);
`;
