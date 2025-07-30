import React from "react";
import styled from "styled-components";

import BaseAccessibleComponent from "../../../../components/BaseAccessibleComponent";
import Text from "../../../../components/Texts/Text";
import { CardBase } from "./CityRow.style";

interface SmallCardProps {
  index: number;
  cardWidth: number;
  cardHeight: number;
  cardDiff: number;
  card: any;

  onFocus?: (ev: any) => void;
  onBlur?: (ev: any) => void;
  onClick?: (ev: any) => void;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
  onMouseEnter?: (ev: React.MouseEvent) => void;
  onMouseLeave?: (ev: React.MouseEvent) => void;
}

export default React.memo(
  ({
    index,
    cardWidth,
    cardHeight,
    cardDiff,
    card,
    onFocus = (ev: any) => {},
    onBlur = (ev: any) => {},
    onClick = (ev: any) => {},
    onKeyDown = (ev: React.KeyboardEvent) => {},
    onKeyUp = (ev: React.KeyboardEvent) => {},
    onMouseEnter = (ev: React.MouseEvent) => {},
    onMouseLeave = (ev: React.MouseEvent) => {},
  }: SmallCardProps) => {
    return (
      <BaseAccessibleComponent
        id={"home-city-row-small-" + index}
        component={SmallCard}
        key={index}
        $cardWidth={cardWidth}
        $cardHeight={cardHeight}
        $cardDiff={cardDiff}
        $background={card.color}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <SmallCardTitle textStyle="headerXlSb">{card.title}</SmallCardTitle>
      </BaseAccessibleComponent>
    );
  },
  (prev, next) => true
);

export const SmallCard = styled(CardBase)<{ $cardDiff: number }>`
  position: relative;

  opacity: 1;

  transition: opacity ease 0.3s, transform ease 0.3s;
  will-change: opacity, transform;

  &.focused {
    padding-right: ${({ $cardDiff }) => $cardDiff}px;
  }

  &:focus {
    outline: 3px solid #e6e6e6;
  }

  /* &:focus {
    width: 1031px;

    outline: 3px solid #e6e6e6;

    padding-right: ${({ $cardDiff }) => $cardDiff}px;
  } */

  /* &.selected {
    opacity: 0;


  }

  &.hovered {
    outline: 3px solid #e6e6e6;
  }

  &.hided {
    opacity: 0.2;
  } */
`;

export const SmallCardTitle = styled(Text)`
  position: absolute;
  bottom: 46px;
  left: 40px;
  right: 40px;

  background: tan;
`;
