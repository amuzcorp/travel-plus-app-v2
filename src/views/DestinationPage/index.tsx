import React, { useMemo } from "react";
import styled from "styled-components";

import {
  continentCardHeight,
  destinationCardGap,
  destinationCardWidth,
} from "../../constants/globalConstant";
import Header from "../../components/Headers/Header";
import DestinationCard, {
  DestinationCardData,
} from "../../components/Cards/DestinationCard/DestinationCard";
import { useScrollableColumn } from "../../components/Scrollables/useScrollableColumn";
import { translate } from "../../utils/translate";
import ScrollableColumn from "../../components/Scrollables/ScrollableColumn";

const datas = [
  {
    title: "아시아",
    background: "tomato",
  },
  {
    title: "유럽",
    background: "dodgerblue",
  },
  {
    title: "북아메리카",
    background: "mediumseagreen",
  },
  {
    title: "남아메리카",
    background: "gold",
  },
  {
    title: "아프리카",
    background: "sandybrown",
  },
  {
    title: "오세아니아",
    background: "orchid",
  },
  {
    title: "남극",
    background: "lightslategrey",
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
          id={index}
          key={index}
          data={
            new DestinationCardData({
              title: data.title,
              background: data.background,
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

      <ScrollableColumn
        $marginTop={198}
        spotlightId={containerId}
        scrollerRef={scrollerRef}
        $gap={24}
      >
        {cards}
      </ScrollableColumn>
    </DestinationWrapper>
  );
});

export default DestinationPage;

const DestinationWrapper = styled.div``;
