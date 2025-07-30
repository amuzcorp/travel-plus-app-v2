import React, { useMemo } from "react";

import ContentCard, {
  Badges,
  BaseData,
  PanoramaData,
  PanoramaFeatures,
  VideoData,
  VideoFeatures,
} from "../../../../components/Cards/ContentCard/ContentCard";
import ScrollableRow from "../../../../components/Scrollables/ScrollableRow";
import { useScrollableRow } from "../../../../components/Scrollables/useScrollableRow";
import Text from "../../../../components/Texts/Text";
import {
  contentCardGap,
  contentCardWidth,
  homeContainerKeys,
} from "../../../../core/constants/globalConstant";
import { translate } from "../../../../utils/translate";
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
    containerId: homeContainerKeys.favorite,
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

  return (
    <SectionWrapper $marginLeft={180}>
      <Text textStyle="titleMdSb">
        {translate("luggage.favoriteVideosInLuggage")}
      </Text>

      <RelativeBox>
        <ScrollableRow
          spotlightId={homeContainerKeys.favorite}
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
