import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import GradientBottomComponent from "../../../../assets/gradients/GradientCarouselBottom";
import GradientLeftComponent from "../../../../assets/gradients/GradientCarouselLeft";
import ArrowRightButton from "../../../../components/Buttons/ArrowButtons/ArrowRightButton";
import RoundButton from "../../../../components/Buttons/RoundButton/RoundButton";
import ViewMoreSmallButton from "../../../../components/Buttons/ViewMoreButtons/ViewMoreSmallButton";
import { useGlobalNavigationBar } from "../../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import { homeKeys } from "../../../../constants/globalConstant";
import { useDialog } from "../../../../hooks/useDialog";
import { useHomePageSroll } from "../../useHomePageScroll";
import {
  ArrowButtonWrapper,
  CarouselContainer,
  ContentWrapper,
  GradientBottom,
  GradientLeft,
  HeaderText,
  InfoWrapper,
  MapWrapper,
  MoreWrapper,
  VideoWrapper,
} from "./CarouselRow.style";

export const viewMoreId = "home-carousel-row-view-more";

export default React.memo(
  () => {
    const descriptionRef = useRef(null);
    const { showDialog } = useDialog();

    const titleText = "eifjao;sdjf;ijkelfasjdfioej;alksdjfa;lisejf;asldkjf;";
    const descriptionText =
      "Experience Milan's Piazza del Duomo—featuring the breathtaking cathedral, historic galleria, and vibrant cultural charm all in one iconic location! Experience Milan's Piazza del Duomo—featuring the breathtaking cathedral,";

    const [showViewMore, setShowViewMore] = useState(false);

    const { focus } = useGlobalNavigationBar();
    const { homeScrollTo } = useHomePageSroll();

    const onClickViewMore = useCallback(() => {
      showDialog({
        title: titleText,
        content: descriptionText,
        focusIdOnDismiss: viewMoreId,
      });
    }, [showDialog]);

    const onKeyDown = useCallback(
      (ev) => {
        if (ev.key === "ArrowLeft") {
          ev.preventDefault();
          ev.stopPropagation();
          focus(homeKeys.carousel.defaultKey);
        }
      },
      [focus]
    );

    const onTravelNowKeyDown = useCallback(
      (ev) => {
        if (ev.key === "ArrowDown") {
          ev.preventDefault();
          ev.stopPropagation();
          homeScrollTo(homeKeys.city);
        } else if (ev.key === "ArrowRight") {
          ev.preventDefault();
          ev.stopPropagation();
        }
      },
      [homeScrollTo]
    );

    const travelButton = useMemo(() => {
      const id = homeKeys.carousel.defaultKey;

      return (
        <RoundButton spotlightId={id} onKeyDown={onTravelNowKeyDown}>
          Travel Now
        </RoundButton>
      );
    }, [onTravelNowKeyDown]);

    useEffect(() => {
      const target = descriptionRef.current;

      if (target) {
        const showViewMoreButton = target.clientHeight < target.scrollHeight;
        setShowViewMore(showViewMoreButton);
      }
    }, []);

    return (
      <div id={homeKeys.carousel.sectionKey}>
        <CarouselContainer
          spotlightId={homeKeys.carousel.containerKey}
          spotlightRestrict="self-first"
          onKeyDown={onKeyDown}
        >
          {/* Video */}
          <VideoWrapper />

          {/* Gradients */}
          <GradientLeft>
            <GradientLeftComponent
              width="67vw"
              height="100%"
              preserveAspectRatio="none"
            />
          </GradientLeft>
          <GradientBottom>
            <GradientBottomComponent
              width="100vw"
              height="100%"
              preserveAspectRatio="none"
            />
          </GradientBottom>

          {/* Contents */}
          <ContentWrapper>
            <HeaderText textStyle={"headerHugeSb"}>{titleText}</HeaderText>

            <Spacing size={16} />

            <InfoWrapper>
              <Text>국가</Text>
              <Text>국가</Text>
              <Text>국가</Text>
            </InfoWrapper>

            <Text ref={descriptionRef} textStyle={"bodyMdRg"} maxLine={3}>
              {descriptionText}
            </Text>

            <MoreWrapper>
              <Spacing size={16} />
              {showViewMore && (
                <ViewMoreSmallButton
                  spotlightId={viewMoreId}
                  onClick={onClickViewMore}
                >
                  View More
                </ViewMoreSmallButton>
              )}
            </MoreWrapper>

            <MapWrapper>
              <div
                style={{
                  width: 216,
                  height: 260,
                  background: "tomato",
                }}
              />
            </MapWrapper>

            <Spacing size={60} />
            {travelButton}
          </ContentWrapper>

          <ArrowButtonWrapper>
            <ArrowRightButton />
          </ArrowButtonWrapper>
        </CarouselContainer>
      </div>
    );
  },
  () => true
);
