import React, { useCallback, useMemo } from "react";

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
  homeKeys,
} from "../../../../constants/globalConstant";
import ContentItem from "../../../../entities/HomeSection/ContentItem";
import HomeSection from "../../../../entities/HomeSection/HomeSection";
import { useHomePageSroll } from "../../useHomePageScroll";
import { RelativeBox } from "../CityRow/CityRow.style";

export default React.memo(({ section }: { section: HomeSection }) => {
  const items = section.items as ContentItem[];

  const { prevSection, currentSection, homeScrollTo } = useHomePageSroll({
    currentSection: "panorama",
  });

  const {
    ref: scrollerRef,
    onKeyDown,
    onKeyUp,
    onFocus,
  } = useScrollableRow({
    containerId: homeKeys.panorama.containerKey,
    contentWidth: contentCardWidth,
    contentGap: contentCardGap,
    maxDataLength: items.length,
    useScrollToEnd: false,
  });

  const onRowKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        ev.stopPropagation();
        homeScrollTo(prevSection, "center");
      } else if (ev.key === "ArrowDown") {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    [homeScrollTo, prevSection]
  );

  const onRowClick = useCallback(() => {
    homeScrollTo(currentSection, "center");
  }, [homeScrollTo, currentSection]);

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
    <SectionWrapper
      id={homeKeys.panorama.sectionKey}
      $marginLeft={180}
      onKeyDown={onRowKeyDown}
      onClick={onRowClick}
    >
      <Text textStyle="titleMdSb">{section.title}</Text>

      <RelativeBox>
        <ScrollableRow
          spotlightId={homeKeys.panorama.containerKey}
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
