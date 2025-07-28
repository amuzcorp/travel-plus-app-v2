import Marquee from "@enact/ui/Marquee";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import BaseAccessibleComponent from "../../../../components/BaseAccessibleComponent";
import I4k from "../../../../components/Icons/I4k";
import IDriving from "../../../../components/Icons/IDriving";
import IDrone from "../../../../components/Icons/IDrone";
import IHot from "../../../../components/Icons/IHot";
import IImage from "../../../../components/Icons/IImage";
import INew from "../../../../components/Icons/INew";
import IPanorama from "../../../../components/Icons/IPanorama";
import IPlace from "../../../../components/Icons/IPlace";
import IVideo from "../../../../components/Icons/IVideo";
import IWalking from "../../../../components/Icons/IWalking";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import {
  contentCardGap,
  contentCardWidth,
} from "../../../../core/constants/globalConstant";
import { translate } from "../../../../utils/translate";
import {
  NormalizeWrapper,
  RelativeBox,
  ScrollWrapper,
  SectionWrapper,
  SpottableWrapper,
} from "../CityRow/CityRow.style";

//-----------------------------------------------------------------------------------------------------

const enum VideoFeatures {
  FOUR_K,
  DRIVING,
  PLACE,
  WALKING,
  DRONE,
  VIDEO,
}

const enum PanoramaFeatures {
  PANORAMA,
}

const enum ImageFeatures {
  IMAGE,
}

const enum Badges {
  NEW,
  HOT,
  NETFLIX,
  HULU,
  DISNEY,
}

//-----------------------------------------------------------------------------------------------------

interface BaseDataProps {
  badges?: Badges[];
}

class BaseData {
  constructor({ badges = [] }: BaseDataProps) {
    this.badges = badges;
  }

  badges: Badges[];
}

//-----------------------------------------------------------------------------------------------------

interface VideoDataProps extends BaseDataProps {
  features: VideoFeatures[];
  title: string;
  from: string;
  views: string;
  createdAt: string;
}

class VideoData extends BaseData {
  constructor({
    badges,
    features,
    title,
    views,
    from,
    createdAt,
  }: VideoDataProps) {
    super({ badges: badges });

    this.features = features;
    this.title = title;
    this.from = from;
    this.views = views;
    this.createdAt = createdAt;
  }

  features: VideoFeatures[];
  title: string;
  from: string;
  views: string;
  createdAt: string;
}

//-----------------------------------------------------------------------------------------------------

interface PanoramaDataProps extends BaseDataProps {
  features: PanoramaFeatures[];
  title: string;
  country: string;
  city: string;
}

class PanoramaData extends BaseData {
  constructor({ badges, features, title, country, city }: PanoramaDataProps) {
    super({ badges: badges });

    this.features = features;
    this.title = title;
    this.country = country;
    this.city = city;
  }

  features: PanoramaFeatures[];
  title: string;
  country: string;
  city: string;
}

//-----------------------------------------------------------------------------------------------------

interface ImageDataProps extends BaseDataProps {
  features: ImageFeatures[];
  title: string;
  country: string;
  city: string;
}

class ImageData extends BaseData {
  constructor({ badges, features, title, country, city }: ImageDataProps) {
    super({ badges: badges });

    this.features = features;
    this.title = title;
    this.country = country;
    this.city = city;
  }

  features: ImageFeatures[];
  title: string;
  country: string;
  city: string;
}

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
  const scrollChildRef = useRef<any>(null);

  function getComponentData(data: BaseData) {
    const title = getComponentTitle(data);
    const description = getComponentDescription(data);
    const badges = getComponentBadges(data);
    const features = getComponentFeatures(data);

    return { title, description, badges, features };
  }

  function getComponentTitle(data: BaseData): string {
    let title: string;

    if (data instanceof VideoData) {
      title = data.title;
    } else if (data instanceof PanoramaData) {
      title = data.title;
    } else if (data instanceof ImageData) {
      title = data.title;
    } else {
      title = "";
    }

    return title;
  }

  function getComponentDescription(data: BaseData): string | React.ReactNode {
    let description: string | React.ReactNode;

    if (data instanceof VideoData) {
      description = (
        <DateWrapper>
          <p>{data.from}</p>
          <p>{data.views}</p>
          <p>{data.createdAt}</p>
        </DateWrapper>
      );
    } else if (data instanceof PanoramaData || data instanceof ImageData) {
      description = data.city + ", " + data.country;
    } else {
      description = "";
    }

    return description;
  }

  function getComponentBadges(data: BaseData): React.ReactNode {
    let badges: React.ReactNode;

    badges = data.badges.map((badge, index) => {
      switch (badge) {
        case Badges.HOT:
          return <IHot />;
        case Badges.NEW:
          return <INew />;
        default:
          return <div />;
      }
    });

    return badges;
  }

  function getComponentFeatures(data: BaseData): React.ReactNode {
    let features: React.ReactNode;

    if (data instanceof VideoData) {
      const sortedFeatures = [...data.features].sort((a, b) => a - b);

      features = sortedFeatures.map((feature, index) => {
        switch (feature) {
          case VideoFeatures.FOUR_K:
            return <I4k />;
          case VideoFeatures.DRIVING:
            return <IDriving />;
          case VideoFeatures.PLACE:
            return <IPlace />;
          case VideoFeatures.WALKING:
            return <IWalking />;
          case VideoFeatures.DRONE:
            return <IDrone />;
          case VideoFeatures.VIDEO:
            return <IVideo />;
          default:
            return <div />;
        }
      });
    } else if (data instanceof PanoramaData) {
      features = data.features.map((feature, index) => {
        switch (feature) {
          case PanoramaFeatures.PANORAMA:
            return <IPanorama />;
        }
      });
    } else if (data instanceof ImageData) {
      features = data.features.map((feature, __) => {
        switch (feature) {
          case ImageFeatures.IMAGE:
            return <IImage />;
        }
      });
    } else {
      features = <div />;
    }

    return features;
  }

  const scrollToTarget = useCallback(
    ({
      targetIndex = 0,
      useScroll = true,
    }: {
      targetIndex: number;
      useScroll?: boolean;
    }) => {
      const targetOffset = targetIndex * (contentCardWidth + contentCardGap);

      if (useScroll) {
        const el = document.getElementById("home-favorite-row-container");

        if (el instanceof HTMLElement) {
          el.style.transform = `translateX(-${targetOffset}px)`;
        }
      }
    },
    []
  );

  useEffect(() => {
    scrollToTarget({ targetIndex: 0, useScroll: false });
  }, [scrollToTarget]);

  const onKeyDowns = useMemo(() => {
    return datas.map((__, index) => {
      return (ev: React.KeyboardEvent) => {
        console.log("Lets do this!");

        let targetIndex = 0;
        let useScroll = false;

        if (ev.key === "ArrowRight") {
          targetIndex = Math.min(index + 1, datas.length - 1);
          useScroll = true;
        } else if (ev.key === "ArrowLeft") {
          targetIndex = Math.max(index - 1, 0);
          useScroll = true;
        }

        if (useScroll) {
          scrollToTarget({ targetIndex: targetIndex });
        }
      };
    });
  }, [scrollToTarget]);

  const onKeyUps = useMemo(() => {
    return datas.map((__, index) => {
      return (ev: React.KeyboardEvent) => {
        if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") {
          scrollToTarget({ targetIndex: index });
        }
      };
    });
  }, [scrollToTarget]);

  return (
    <SectionWrapper $marginLeft={180}>
      <Text textStyle="titleMdSb">
        {translate("destinations.placesMemories")}
      </Text>

      <RelativeBox>
        <NormalizeWrapper>
          <ScrollWrapper>
            <SpottableWrapper
              id={"home-favorite-row-container"}
              spotlightId={"home-favorite-row-container"}
              ref={scrollChildRef}
            >
              {datas.map((data, index) => {
                const { title, description, badges, features } =
                  getComponentData(data);

                return (
                  <BaseAccessibleComponent
                    id={index}
                    key={index}
                    $width={contentCardWidth}
                    component={ContentCardWrapper}
                    onKeyDown={onKeyDowns[index]}
                    onKeyUp={onKeyUps[index]}
                  >
                    <ImageWrapper
                      className={"image-wrapper"}
                      $width={contentCardWidth}
                    >
                      <BadgeWrapper>{badges}</BadgeWrapper>
                      <FeatureWrapper>{features}</FeatureWrapper>
                    </ImageWrapper>
                    <TitleWrapper>{title}</TitleWrapper>
                    <DescriptionWrapper>{description}</DescriptionWrapper>
                  </BaseAccessibleComponent>
                );
              })}
            </SpottableWrapper>
          </ScrollWrapper>
        </NormalizeWrapper>
      </RelativeBox>
      <Spacing size={50} />
    </SectionWrapper>
  );
});

const ContentCardWrapper = styled.div<{ $width?: number }>`
  width: ${({ $width }) => $width ?? 0}px;
  height: auto;

  transition: transform ease 0.3s;

  &:focus {
    transform: scale(1.1);

    .image-wrapper {
      outline: solid 3px ${({ theme }) => theme.colors.text.primary};

      &::after {
        box-shadow: none;
      }
    }
  }
`;

const ImageWrapper = styled.div<{ $width?: number }>`
  position: relative;

  width: ${({ $width }) => $width ?? 0}px;
  aspect-ratio: 16/9;

  border-radius: 12px;
  background: hotpink;

  margin-bottom: 16px;

  &::after {
    display: block;
    content: "";

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    box-shadow: ${({ theme }) =>
      `inset 0 0 0 1px ${theme.colors.deactive.normal}`};

    border-radius: 12px;
  }
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const FeatureWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  & > :not(:last-child) {
    margin-right: 6px;
  }
`;

const TitleWrapper = styled(Marquee)`
  width: 100%;
  height: auto;

  margin-bottom: 4px;

  font-size: ${({ theme }) => theme.textStyle.titleSmSb.fontSize};
  font-weight: 600;
  font-family: "LGSmartUI";
`;

const DescriptionWrapper = styled.div`
  width: 100%;

  overflow: hidden;

  font-size: ${({ theme }) => theme.textStyle.titleTinySb.fontSize};
  font-family: "LGSmartUI";
  color: ${({ theme }) => theme.colors.text.primary};

  opacity: 0.7;
`;

const DateWrapper = styled.div`
  display: flex;

  overflow: hidden;

  & > :not(:last-child) {
    display: flex;

    align-items: center;

    &::after {
      display: block;
      content: "";

      width: 4px;
      height: 4px;

      background: ${({ theme }) => theme.colors.deactive.normal};

      border-radius: 50%;

      margin: 0 6px;
    }
  }

  & > * {
    margin: 0 0;
  }
`;
