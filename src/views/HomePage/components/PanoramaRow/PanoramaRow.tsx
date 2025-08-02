import React, { useMemo } from "react";

import ContentCard, {
  Badges,
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
import ContentItem from "../../../../entities/HomeSection/ContentItem";
import HomeSection from "../../../../entities/HomeSection/HomeSection";
import { RelativeBox } from "../CityRow/CityRow.style";

// const datas: BaseData[] = [
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [],
//     title: "Famous Destinations in Italy",
//     country: "Italy",
//     city: "Roma",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.HOT],
//     title: "View of Dubai from Burj Kahlifa",
//     country: "United Arab Emirates",
//     city: "Dubai",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.NEW],
//     title: "View of Tbilisi Old Town",
//     country: "Georgia",
//     city: "Tbilisi",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [],
//     title: "Famous Destinations in Italy",
//     country: "Italy",
//     city: "Roma",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.HOT],
//     title: "View of Dubai from Burj Kahlifa",
//     country: "United Arab Emirates",
//     city: "Dubai",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.NEW],
//     title: "View of Tbilisi Old Town",
//     country: "Georgia",
//     city: "Tbilisi",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [],
//     title: "Famous Destinations in Italy",
//     country: "Italy",
//     city: "Roma",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.HOT],
//     title: "View of Dubai from Burj Kahlifa",
//     country: "United Arab Emirates",
//     city: "Dubai",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.NEW],
//     title: "View of Tbilisi Old Town",
//     country: "Georgia",
//     city: "Tbilisi",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [],
//     title: "Famous Destinations in Italy",
//     country: "Italy",
//     city: "Roma",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.HOT],
//     title: "View of Dubai from Burj Kahlifa",
//     country: "United Arab Emirates",
//     city: "Dubai",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.NEW],
//     title: "View of Tbilisi Old Town",
//     country: "Georgia",
//     city: "Tbilisi",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [],
//     title: "Famous Destinations in Italy",
//     country: "Italy",
//     city: "Roma",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.HOT],
//     title: "View of Dubai from Burj Kahlifa",
//     country: "United Arab Emirates",
//     city: "Dubai",
//   }),
//   new PanoramaData({
//     features: [PanoramaFeatures.PANORAMA],
//     badges: [Badges.NEW],
//     title: "View of Tbilisi Old Town",
//     country: "Georgia",
//     city: "Tbilisi",
//   }),
// ];

export default React.memo(({ section }: { section: HomeSection }) => {
  const containerId = "home-panorama-row-container";

  const items = section.items as ContentItem[];

  const {
    ref: scrollerRef,
    onKeyDown,
    onKeyUp,
    onFocus,
  } = useScrollableRow({
    containerId: containerId,
    contentWidth: contentCardWidth,
    contentGap: contentCardGap,
    maxDataLength: items.length,
    useScrollToEnd: false,
  });

  const onKeyDowns = useMemo(() => {
    return items.map((__, index) => {
      return (ev: React.KeyboardEvent) => onKeyDown(ev, index);
    });
  }, [items, onKeyDown]);

  const onKeyUps = useMemo(() => {
    return items.map((__, index) => {
      return (ev: React.KeyboardEvent) => onKeyUp(ev, index);
    });
  }, [items, onKeyUp]);

  const onFocuses = useMemo(() => {
    return items.map((__, index) => {
      return (ev: any) => onFocus(ev, index);
    });
  }, [items, onFocus]);

  const cards = useMemo(() => {
    return items.map((item, index) => {
      const features = [PanoramaFeatures.PANORAMA];
      const badges = [];

      if (item.is4k) {
        features.push(PanoramaFeatures.FOUR_K);
      }

      if (item.isHot) {
        badges.push(Badges.HOT);
      } else if (item.isNew) {
        badges.push(Badges.NEW);
      }

      console.log(item.thumbnail);

      const data = new PanoramaData({
        features: features,
        badges: badges,
        title: item.title,
        country: item.countryName,
        city: item.cityName,
        thumbnailUrl: item.thumbnail,
      });

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
  }, [items, onKeyDowns, onKeyUps, onFocuses]);

  return (
    <SectionWrapper $marginLeft={180}>
      <Text textStyle="titleMdSb">{section.title}</Text>

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
