import React, { useMemo } from "react";
import styled from "styled-components";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import {
  continentCardHeight,
  destinationCardGap,
} from "../../constants/globalConstant";
import Header from "../../components/Headers/Header";
import DestinationCard, {
  DestinationCardData,
} from "../../components/Cards/DestinationCard/DestinationCard";
import { useScrollableColumn } from "../../components/Scrollables/useScrollableColumn";
import { translate } from "../../utils/translate";
import northAmerica from "../../components/Images/north_america.png";
import southAmerica from "../../components/Images/south_america.png";
import europe from "../../components/Images/europe.png";
import africa from "../../components/Images/africa.png";
import asia from "../../components/Images/asia.png";
import oceania from "../../components/Images/oceania.png";
import antarctica from "../../components/Images/antarctica.png";

const datas = [
  {
    title: "북아메리카",
    image: northAmerica,
  },
  {
    title: "남아메리카",
    image: southAmerica,
  },
  {
    title: "유럽",
    image: europe,
  },
  {
    title: "아프리카",
    image: africa,
  },
  {
    title: "아시아",
    image: asia,
  },
  {
    title: "오세아니아",
    image: oceania,
  },
  {
    title: "남극",
    image: antarctica,
  },
];

const DestinationPage = React.memo(() => {
  const containerId = "destination-row-container";

  const {
    ref: scrollerRef,
    onKeyDown,
    onKeyUp,
  } = useScrollableColumn({
    containerId: containerId,
    contentHeight: continentCardHeight,
    contentGap: destinationCardGap,
    maxDataLength: datas.length,
  });
  const onKeyDowns = useMemo(() => {
    return datas.map((__, index) => {
      return (ev: React.KeyboardEvent) => onKeyDown(ev, index);
    });
  }, [onKeyDown]);

  const onKeyUps = useMemo(() => {
    return datas.map((__, index) => {
      return (ev: React.KeyboardEvent) => onKeyUp(ev, index);
    });
  }, [onKeyUp]);

  const cards = useMemo(() => {
    return datas.map((data, index) => {
      return (
        <DestinationCard
          type="continent"
          id={index}
          key={index}
          data={
            new DestinationCardData({
              title: data.title,
              image: data.image,
            })
          }
          onKeyDown={onKeyDowns[index]}
          onKeyUp={onKeyUps[index]}
        />
      );
    });
  }, [onKeyDowns, onKeyUps]);

  const stepList = useMemo(
    () => [
      translate("destinations.continent"),
      translate("destinations.country"),
      translate("destinations.city"),
    ],
    []
  );
  return (
    <DestinationWrapper>
      <Header
        title={translate("navigation.destinations")}
        subtitle={translate("destinations.pickDestination")}
        stepList={stepList}
        activeStepIndex={0}
      />
      <MainWrapper>
        <SpottableWrapper $marginTop={198} spotlightId={containerId} $gap={24}>
          {cards}
        </SpottableWrapper>

        <MapWrapper>
          <p>지도 영역</p>
        </MapWrapper>
      </MainWrapper>
    </DestinationWrapper>
  );
});

export default DestinationPage;

const DestinationWrapper = styled.div`
  height: 100vh;
  padding-left: 165px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnWrapper = styled.div<{ $marginTop: number; $gap: number }>`
  position: relative;

  display: flex;
  flex-direction: column;

  padding-top: ${({ $marginTop }) => $marginTop ?? 0}px;

  transition: transform ease 0.3s;

  & > :not(:last-child) {
    margin-bottom: ${({ $gap }) => $gap ?? 0}px;
  }
`;

const SpottableWrapper = SpotlightContainerDecorator(ColumnWrapper);

// MapWrapper: 지도 이미지가 표시될 우측 영역
const MapWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  color: #ccc;
`;
