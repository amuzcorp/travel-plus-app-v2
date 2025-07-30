import React from "react";
import styled from "styled-components";

import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
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
        className={"home-city-large"}
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
  }
);

export const LargeCard = styled(CardBase)`
  position: absolute;
  top: 24px;
  left: 0;

  outline: 3px solid rgba(230, 230, 230, 0.3);

  pointer-events: none;
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

      width: 6px;
      height: 6px;

      border-radius: 50%;

      margin: 0 10px;

      background: ${({ theme }) => theme.colors.deactive.normal};
    }
  }
`;
