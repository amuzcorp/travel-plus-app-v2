import React, { useMemo } from "react";
import ContentCard, {
  Badges,
  BaseData,
  PanoramaData,
  PanoramaFeatures,
} from "../../../../components/Cards/ContentCard/ContentCard";
import ScrollableRow from "../../../../components/Scrollables/ScrollableRow";
import { useScrollableRow } from "../../../../components/Scrollables/useScrollableRow";
import Text from "../../../../components/Texts/Text";
import SectionWrapper from "../../../../components/Wrapper/SectionWrapper";
import {
  contentCardGap,
  contentCardWidth,
} from "../../../../constants/globalConstant";
import { translate } from "../../../../utils/translate";
import { RelativeBox } from "../CityRow/CityRow.style";

const datas: BaseData[] = [
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [],
    title: "Famous Destinations in Italy",
    country: "Italy",
    city: "Roma",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.HOT],
    title: "View of Dubai from Burj Kahlifa",
    country: "United Arab Emirates",
    city: "Dubai",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.NEW],
    title: "View of Tbilisi Old Town",
    country: "Georgia",
    city: "Tbilisi",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [],
    title: "Famous Destinations in Italy",
    country: "Italy",
    city: "Roma",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.HOT],
    title: "View of Dubai from Burj Kahlifa",
    country: "United Arab Emirates",
    city: "Dubai",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.NEW],
    title: "View of Tbilisi Old Town",
    country: "Georgia",
    city: "Tbilisi",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [],
    title: "Famous Destinations in Italy",
    country: "Italy",
    city: "Roma",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.HOT],
    title: "View of Dubai from Burj Kahlifa",
    country: "United Arab Emirates",
    city: "Dubai",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.NEW],
    title: "View of Tbilisi Old Town",
    country: "Georgia",
    city: "Tbilisi",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [],
    title: "Famous Destinations in Italy",
    country: "Italy",
    city: "Roma",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.HOT],
    title: "View of Dubai from Burj Kahlifa",
    country: "United Arab Emirates",
    city: "Dubai",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.NEW],
    title: "View of Tbilisi Old Town",
    country: "Georgia",
    city: "Tbilisi",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [],
    title: "Famous Destinations in Italy",
    country: "Italy",
    city: "Roma",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.HOT],
    title: "View of Dubai from Burj Kahlifa",
    country: "United Arab Emirates",
    city: "Dubai",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    badges: [Badges.NEW],
    title: "View of Tbilisi Old Town",
    country: "Georgia",
    city: "Tbilisi",
  }),
];

export default React.memo(() => {
  const containerId = "home-panorama-row-container";

  const {
    ref: scrollerRef,
    onKeyDown,
    onKeyUp,
    onFocus,
  } = useScrollableRow({
    containerId: containerId,
    contentWidth: contentCardWidth,
    contentGap: contentCardGap,
    maxDataLength: datas.length,
    useScrollToEnd: false,
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

  const onFocuses = useMemo(() => {
    return datas.map((__, index) => {
      return (ev: any) => onFocus(ev, index);
    });
  }, [onFocus]);

  const cards = useMemo(() => {
    return datas.map((data, index) => {
      return (
        <ContentCard
          id={index}
          key={index}
          data={data}
          onKeyDown={onKeyDowns[index]}
          onKeyUp={onKeyUps[index]}
          onFocus={onFocuses[index]}
        />
      );
    });
  }, [onKeyDowns, onKeyUps, onFocuses]);

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
