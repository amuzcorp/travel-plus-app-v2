import React, { useCallback, useMemo } from "react";

import ContentCard, {
  Badges,
  BaseData,
  PanoramaData,
  PanoramaFeatures,
  VideoData,
  VideoFeatures,
} from "../../../../components/Cards/ContentCard/ContentCard";
import { useGlobalNavigationBar } from "../../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import ScrollableRow from "../../../../components/Scrollables/ScrollableRow";
import { useScrollableRow } from "../../../../components/Scrollables/useScrollableRow";
import Text from "../../../../components/Texts/Text";
import {
  contentCardGap,
  contentCardWidth,
  homeKeys,
} from "../../../../core/constants/globalConstant";
import { translate } from "../../../../utils/translate";
import { useHomePageSroll } from "../../useHomePageScroll";
import { RelativeBox, SectionWrapper } from "../CityRow/CityRow.style";

//-----------------------------------------------------------------------------------------------------

const datas: BaseData[] = [
  new VideoData({
    features: [VideoFeatures.FOUR_K, VideoFeatures.VIDEO],
    title: "Emily in Paris -  Trailer",
    from: "NETFLIX",
    views: "1.5만회",
    createdAt: "2달 전",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "Travel to London, best view point",
    country: "United Kingdom",
    city: "London",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of the Eiffel Tower",
    country: "France",
    city: "Paris",
    badges: [Badges.HOT],
  }),
  new VideoData({
    features: [VideoFeatures.DRONE],
    title: "MSG Sphere, Las Vegas",
    from: "Expedia",
    views: "7.5천회",
    createdAt: "1년 전",
    badges: [Badges.NEW],
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of Seoul",
    country: "KOREA",
    city: "Seoul",
    badges: [Badges.NEW],
  }),
  new VideoData({
    features: [VideoFeatures.FOUR_K, VideoFeatures.VIDEO],
    title: "Emily in Paris -  Trailer",
    from: "NETFLIX",
    views: "1.5만회",
    createdAt: "2달 전",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "Travel to London, best view point",
    country: "United Kingdom",
    city: "London",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of the Eiffel Tower",
    country: "France",
    city: "Paris",
    badges: [Badges.HOT],
  }),
  new VideoData({
    features: [VideoFeatures.DRONE],
    title: "MSG Sphere, Las Vegas",
    from: "Expedia",
    views: "7.5천회",
    createdAt: "1년 전",
    badges: [Badges.NEW],
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of Seoul",
    country: "KOREA",
    city: "Seoul",
    badges: [Badges.NEW],
  }),
  new VideoData({
    features: [VideoFeatures.FOUR_K, VideoFeatures.VIDEO],
    title: "Emily in Paris -  Trailer",
    from: "NETFLIX",
    views: "1.5만회",
    createdAt: "2달 전",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "Travel to London, best view point",
    country: "United Kingdom",
    city: "London",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of the Eiffel Tower",
    country: "France",
    city: "Paris",
    badges: [Badges.HOT],
  }),
  new VideoData({
    features: [VideoFeatures.DRONE],
    title: "MSG Sphere, Las Vegas",
    from: "Expedia",
    views: "7.5천회",
    createdAt: "1년 전",
    badges: [Badges.NEW],
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of Seoul",
    country: "KOREA",
    city: "Seoul",
    badges: [Badges.NEW],
  }),
  new VideoData({
    features: [VideoFeatures.FOUR_K, VideoFeatures.VIDEO],
    title: "Emily in Paris -  Trailer",
    from: "NETFLIX",
    views: "1.5만회",
    createdAt: "2달 전",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "Travel to London, best view point",
    country: "United Kingdom",
    city: "London",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of the Eiffel Tower",
    country: "France",
    city: "Paris",
    badges: [Badges.HOT],
  }),
  new VideoData({
    features: [VideoFeatures.DRONE],
    title: "MSG Sphere, Las Vegas",
    from: "Expedia",
    views: "7.5천회",
    createdAt: "1년 전",
    badges: [Badges.NEW],
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of Seoul",
    country: "KOREA",
    city: "Seoul",
    badges: [Badges.NEW],
  }),
  new VideoData({
    features: [VideoFeatures.FOUR_K, VideoFeatures.VIDEO],
    title: "Emily in Paris -  Trailer",
    from: "NETFLIX",
    views: "1.5만회",
    createdAt: "2달 전",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "Travel to London, best view point",
    country: "United Kingdom",
    city: "London",
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of the Eiffel Tower",
    country: "France",
    city: "Paris",
    badges: [Badges.HOT],
  }),
  new VideoData({
    features: [VideoFeatures.DRONE],
    title: "MSG Sphere, Las Vegas",
    from: "Expedia",
    views: "7.5천회",
    createdAt: "1년 전",
    badges: [Badges.NEW],
  }),
  new PanoramaData({
    features: [PanoramaFeatures.PANORAMA],
    title: "View of Seoul",
    country: "KOREA",
    city: "Seoul",
    badges: [Badges.NEW],
  }),
];

export default React.memo(() => {
  const {
    ref: scrollerRef,
    onKeyDown,
    onKeyUp,
  } = useScrollableRow({
    containerId: homeKeys.favorite.containerKey,
    contentWidth: contentCardWidth,
    contentGap: contentCardGap,
    maxDataLength: datas.length,
    useScrollToEnd: false,
  });

  const { focus, onKeyDownOnScrollable, onKeyUpOnScrollable } =
    useGlobalNavigationBar();
  const { homeScrollTo } = useHomePageSroll();

  const onKeyDowns = useMemo(() => {
    return datas.map((__, index) => {
      return (ev: React.KeyboardEvent) => {
        onKeyDownOnScrollable(ev, index);

        const atRightOffset = datas.length - 1;

        const atRight = ev.key === "ArrowRight" && index === atRightOffset;
        const atLeft = ev.key === "ArrowLeft" && index === 0;

        if (atRight || atLeft) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          onKeyDown(ev, index);
        }
      };
    });
  }, [onKeyDownOnScrollable, onKeyDown]);

  const onKeyUps = useMemo(() => {
    return datas.map((__, index) => {
      return (ev: React.KeyboardEvent) => {
        const isFocus = onKeyUpOnScrollable(ev, index);

        if (isFocus) {
          ev.preventDefault();
          ev.stopPropagation();
          focus(homeKeys.favorite.containerKey);
        } else if (index === datas.length - 1 && ev.key === "ArrowRight") {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          onKeyUp(ev, index);
        }
      };
    });
  }, [onKeyUpOnScrollable, focus, onKeyUp]);

  const cards = useMemo(() => {
    return datas.map((data, index) => {
      return (
        <ContentCard
          id={index}
          key={index}
          data={data}
          onKeyDown={onKeyDowns[index]}
          onKeyUp={onKeyUps[index]}
        />
      );
    });
  }, [onKeyDowns, onKeyUps]);

  const onRowKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        ev.stopPropagation();
        homeScrollTo(homeKeys.city, "center");
      } else if (ev.key === "ArrowDown") {
        ev.preventDefault();
        ev.stopPropagation();
        homeScrollTo(homeKeys.deals, "center");
      }
    },
    [homeScrollTo]
  );

  return (
    <SectionWrapper
      id={homeKeys.favorite.sectionKey}
      $marginLeft={180}
      onKeyDown={onRowKeyDown}
    >
      <Text textStyle="titleMdSb">
        {translate("luggage.favoriteVideosInLuggage")}
      </Text>

      <RelativeBox>
        <ScrollableRow
          spotlightId={homeKeys.favorite.containerKey}
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
