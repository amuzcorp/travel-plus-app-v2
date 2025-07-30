import SpotlightContainerDecorator, {
  SpotlightContainerDecoratorConfig,
} from "@enact/spotlight/SpotlightContainerDecorator";
import styled from "styled-components";

const ContainerWarapper = styled.div``;

const spotlightConfig: SpotlightContainerDecoratorConfig = {
  restrict: "self-only",
  enterTo: "default-element",
  defaultElement: ["gnb-menu-home"],
  continue5WayHold: true,
};

export const SpotlightContainer = SpotlightContainerDecorator(
  spotlightConfig,
  ContainerWarapper
);

export const GNBWrapper = styled.div`
  position: fixed;

  width: calc(79 / 24 * 1rem);

  height: calc(100vh - 100 / 24 * 1rem);

  margin: calc(20 / 24 * 1rem) 0;
  padding: calc(30 / 24 * 1rem) calc(25.5 / 24 * 1rem);

  border-top-right-radius: calc(12 / 24 * 1rem);
  border-bottom-right-radius: calc(12 / 24 * 1rem);

  z-index: ${({ theme }) => theme.zIndex.gnb};

  transition: width ease 0.2s;
  will-change: width;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.expanded {
    width: calc(390 / 24 * 1rem);

    background: rgba(0, 0, 0, 0.8);
    box-shadow: inset 0 1px 0 0 ${({ theme }) => theme.colors.text.primaryVari},
      inset -1px 0 0 0 ${({ theme }) => theme.colors.text.primaryVari},
      inset 0 -1px 0 0 ${({ theme }) => theme.colors.text.primaryVari};
  }
`;

export const GNBOverlay = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;

  z-index: ${({ theme }) => theme.zIndex.gnb};

  transition: opacity ease 0.2s;
  will-change: opacity;

  pointer-events: none;

  &.expanded {
    background: rgba(0, 0, 0, 0.7);

    opacity: 1;

    pointer-events: auto;
  }
`;

export const SectionWrapper = styled.div``;
