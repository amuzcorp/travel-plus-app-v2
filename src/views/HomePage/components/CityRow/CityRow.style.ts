import styled from "styled-components";

import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import Text from "../../../../components/Texts/Text";
import { rem } from "../../../../utils/rem";

export const SectionWrapper = styled.div<{ $marginLeft?: number }>`
  width: calc(100vw - 180px);
  margin-left: ${({ $marginLeft }) => $marginLeft ?? 0}px;
`;

export const CardBase = styled.div<{
  $cardWidth: number;
  $cardHeight: number;
  $background: string;
}>`
  width: ${({ $cardWidth }) => $cardWidth}px;
  height: ${({ $cardHeight }) => $cardHeight}px;

  background: ${({ $background }) => $background};

  border-radius: 12px;

  box-shadow: ${({ theme }) =>
    `inset 0 0 0 1px ${theme.colors.deactive.normal}`};

  &::before {
    position: absolute;

    width: 100%;
    height: 100%;
    content: "";

    display: block;

    background: rgba(0, 0, 0, 0.4);

    border-radius: 12px;
  }
`;

export const RelativeBox = styled.div`
  position: relative;

  margin-bottom: -24px;
`;

export const LargeCard = styled(CardBase)`
  position: absolute;
  top: 24px;
  left: 0;

  outline: 3px solid #e6e6e6;

  pointer-events: none;

  opacity: 0;

  &.selected {
    opacity: 1;
  }

  &.hovered {
    outline: ${({ theme }) => `3px solid ${theme.colors.text.focused}`};
  }
`;

export const LargeCardWrapper = styled.div`
  position: relative;
`;

export const LeftSection = styled.div`
  position: absolute;
  top: 76px;

  left: 70px;

  width: 496px;

  display: flex;
  flex-direction: column;
`;

export const RightSection = styled.div`
  position: absolute;
  top: 90px;
  right: 70px;

  width: 363px;
  height: 545px;
`;

export const Description = styled.span`
  display: flex;

  & > :not(:last-child) {
    display: flex;

    align-items: center;

    &::after {
      display: block;
      content: "";

      width: ${rem(6)};
      height: ${rem(6)};

      border-radius: 50%;

      margin: 0 10px;

      background: ${({ theme }) => theme.colors.deactive.normal};
    }
  }
`;

export const SmallCard = styled(CardBase)<{ $cardDiff: number }>`
  position: relative;

  opacity: 1;

  transition: opacity ease 0.5s, transform ease 0.1s;

  &.selected {
    opacity: 0;

    padding-right: ${({ $cardDiff }) => $cardDiff}px;
  }

  &.hovered {
    outline: 3px solid #e6e6e6;
  }

  &.hided {
    opacity: 0.2;
  }
`;

export const SmallCardTitle = styled(Text)`
  position: absolute;
  bottom: 46px;
  left: 40px;
  right: 40px;

  background: tan;
`;

export const RowWrapper = styled.div`
  position: relative;

  display: flex;

  padding-left: 180px;
  padding-right: calc(100vw - 180px);

  transition: transform ease 0.3s;

  & > :not(:last-child) {
    margin-right: 24px;
  }
`;

export const SpottableWrapper = SpotlightContainerDecorator(RowWrapper);

export const NormalizeWrapper = styled.div`
  position: relative;
`;

export const ScrollWrapper = styled.div`
  display: flex;

  overflow-x: hidden;
  overflow-y: visible;

  margin-left: -180px;

  padding: 24px 0;
`;
