import React, { useMemo } from "react";
import styled from "styled-components";

import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import CityItem from "../../../../entities/HomeSection/CityItem";
import { translate } from "../../../../utils/translate";
import { CardBase } from "./CityRow.style";

interface LargeCardProps {
  index: number;
  cardWidth: number;
  cardHeight: number;
  item: CityItem;
}

export default React.memo(
  ({ index, cardWidth, cardHeight, item }: LargeCardProps) => {
    const miniMap = useMemo(() => {
      return (
        <MiniMap
          key={index}
          // src={item.blurredImageUrl}
          src={
            "https://travel-plus-cms.dev.amuz.kr/storage/assets/Travel Deals & More-gil.png"
          }
          alt={"home-city-row-large-map-" + index}
        />
      );
    }, [item.blurredImageUrl, index]);

    return (
      <LargeCard
        id={"home-city-row-large-" + index}
        className={"home-city-large"}
        aria-hidden="true"
        $cardWidth={cardWidth}
        $cardHeight={cardHeight}
        $background={"black"}
        key={index}
      >
        <LargeCardWrapper>
          <LargeCardBackground
            src={item.blurredImageUrl}
            alt={"home-city-row-large-bg-" + index}
          />
          <LargeCardGradient />
          <LeftSection>
            <Text textStyle="headerHugeSb">{item.title}</Text>
            <Spacing size={16} />
            <Text textStyle="titleMdSb">
              <Description>
                <div>
                  <CountryFlag
                    src={item.countryFlag}
                    alt={"home-city-row-large-flag-" + index}
                  />
                  {item.countryName}
                </div>
                <div>{item.continentName}</div>
              </Description>
            </Text>
            <Spacing size={8} />
            <Text textStyle="titleMdSb">
              {translate("destinations.bestTimeToVisit", {
                startMonth: item.bestTravelTimeText.split("-")[0],
                endMonth: item.bestTravelTimeText.split("-")[1],
              })}
            </Text>
          </LeftSection>
          <RightSection>{miniMap}</RightSection>
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

  outline: 3px solid rgba(230, 230, 230, 0.3);

  pointer-events: none;

  overflow: hidden;
`;

export const LargeCardWrapper = styled.div`
  position: relative;

  border-radius: 12px;
  overflow: hidden;
`;

export const LargeCardBackground = styled.img`
  border-radius: 12px;
`;

export const LargeCardGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const LeftSection = styled.div`
  position: absolute;
  top: 76px;

  left: 70px;

  width: 496px;

  display: flex;
  flex-direction: column;
`;

export const CountryFlag = styled.img`
  width: 32;
  height: 32;

  object-fit: scale-down;

  margin-right: 8px;
`;

export const RightSection = styled.div`
  position: absolute;
  top: 90px;
  right: 70px;

  width: 363px;
  height: 545px;
`;

export const MiniMap = styled.img`
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
