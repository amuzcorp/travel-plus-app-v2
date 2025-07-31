import React from "react";
import styled from "styled-components";

import HomeItem from "src/entities/homeSection/HomeItem";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import { CardBase } from "./CityRow.style";

interface LargeCardProps {
  index: number;
  cardWidth: number;
  cardHeight: number;
  item: HomeItem;
}

export default React.memo(
  ({ index, cardWidth, cardHeight, item }: LargeCardProps) => {
    return (
      <LargeCard
        id={"home-city-row-large-" + index}
        className={"home-city-large"}
        $cardWidth={cardWidth}
        $cardHeight={cardHeight}
        $background={"black"}
        key={index}
      >
        <LargeCardWrapper>
          <img src={item.blurredImageUrl} />
          <LeftSection>
            <Text textStyle="headerHugeSb">{item.title}</Text>
            <Spacing size={16} />
            <Text textStyle="titleMdSb">
              <Description>
                <div>{item.countryName}</div>
                <div>{item.continentName}</div>
              </Description>
            </Text>
            <Spacing size={8} />
            <Text textStyle="titleMdSb">
              Best Time to visit : {item.bestTravelTimeText}
            </Text>
          </LeftSection>
          <RightSection>
            <img
              width={item.blurRegionData.width}
              height={item.blurRegionData.height}
              src={item.staticMapUrl}
            />
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

  border-radius: 12px;
  overflow: hidden;
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
