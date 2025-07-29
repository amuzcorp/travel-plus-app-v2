import React, { useMemo } from "react";

import CountryCard, {
  CountryCardData,
} from "../../../../components/Cards/CountryCard/CountryCard";
import ScrollableRow from "../../../../components/Scrollables/ScrollableRow";
import { useScrollableRow } from "../../../../components/Scrollables/useScrollableRow";
import Text from "../../../../components/Texts/Text";
import {
  countryCardGap,
  countryCardWidth,
} from "../../../../core/constants/globalConstant";
import { translate } from "../../../../utils/translate";
import { RelativeBox, SectionWrapper } from "../CityRow/CityRow.style";

const datas = [
  {
    title: "South Korea eijfoa;iefjewi;ofjaklsd;fja;oeiwfjia;sldfjslakd;f",
    background: "yellow",
  },
  {
    title: "France",
    background: "cyan",
  },
  {
    title: "Greece",
    background: "blue",
  },
  {
    title: "South Korea",
    background: "yellow",
  },
  {
    title: "France",
    background: "cyan",
  },
  {
    title: "Greece",
    background: "blue",
  },
  {
    title: "South Korea",
    background: "yellow",
  },
  {
    title: "France",
    background: "cyan",
  },
  {
    title: "Greece",
    background: "blue",
  },
  {
    title: "South Korea",
    background: "yellow",
  },
  {
    title: "France",
    background: "cyan",
  },
  {
    title: "Greece",
    background: "blue",
  },
  {
    title: "South Korea",
    background: "yellow",
  },
  {
    title: "France",
    background: "cyan",
  },
  {
    title: "Greece",
    background: "blue",
  },
  {
    title: "South Korea",
    background: "yellow",
  },
  {
    title: "France",
    background: "cyan",
  },
  {
    title: "Greece",
    background: "blue",
  },
];

export default React.memo(() => {
  const containerId = "home-country-row-container";

  const {
    ref: scrollerRef,
    onKeyDown,
    onKeyUp,
  } = useScrollableRow({
    containerId: containerId,
    contentWidth: countryCardWidth,
    contentGap: countryCardGap,
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
        <CountryCard
          id={index}
          key={index}
          data={
            new CountryCardData({
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

  return (
    <SectionWrapper $marginLeft={180}>
      <Text textStyle="titleMdSb">{translate("video.panoramasOfCities")}</Text>

      <RelativeBox>
        <ScrollableRow
          spotlightId={containerId}
          scrollerRef={scrollerRef}
          $marginLeft={180}
          $gap={24}
        >
          {cards}
        </ScrollableRow>
      </RelativeBox>
    </SectionWrapper>
  );
});
