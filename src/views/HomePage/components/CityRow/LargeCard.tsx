import React from "react";
import styled from "styled-components";

import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import { rem } from "../../../../utils/rem";
import { CardBase } from "./CityRow.style";

interface LargeCardProps {
  index: number;
  cardWidth: number;
  cardHeight: number;
  card: any;
}

export default React.memo(
  ({ index, cardWidth, cardHeight, card }: LargeCardProps) => {
    return (
      <LargeCard
        id={"home-city-row-large-" + index}
        $cardWidth={cardWidth}
        $cardHeight={cardHeight}
        $background={card.color}
        key={index}
      >
        <LargeCardWrapper>
          <LeftSection>
            <Text textStyle="headerHugeSb">{card.title}</Text>
            <Spacing size={16} />
            <Text textStyle="titleMdSb">
              <Description>
                <div>{card.city}</div>
                <div>{card.location}</div>
              </Description>
            </Text>
            <Spacing size={8} />
            <Text textStyle="titleMdSb">
              Best Time to visit : {card.bestTimeToVisit}
            </Text>
          </LeftSection>
          <RightSection>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "darkkhaki",
                borderRadius: "12px",
              }}
            >
              <span>
                <p>123123</p>
                <p>{card.title}</p>
              </span>
            </div>
          </RightSection>
        </LargeCardWrapper>
      </LargeCard>
    );
  },
  (prev, next) => true
);

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
