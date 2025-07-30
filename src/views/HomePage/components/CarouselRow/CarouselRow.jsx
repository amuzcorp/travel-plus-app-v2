import React, { useCallback, useEffect, useRef, useState } from "react";

import GradientBottomComponent from "../../../../../assets/gradients/GradientCarouselBottom";
import GradientLeftComponent from "../../../../../assets/gradients/GradientCarouselLeft";
import ArrowRightButton from "../../../../components/Buttons/ArrowButtons/ArrowRightButton";
import RoundButton from "../../../../components/Buttons/RoundButton/RoundButton";
import ViewMoreSmallButton from "../../../../components/Buttons/ViewMoreButtons/ViewMoreSmallButton";
import { useGlobalNavigationBar } from "../../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import { homeContainerKeys } from "../../../../core/constants/globalConstant";
import { useDialog } from "../../../../hooks/useDialog";
import { rem } from "../../../../utils/rem";
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

export default React.memo(
  ({ title, description }) => {
    const descriptionRef = useRef(null);
    const { showDialog } = useDialog();

    const viewMoreId = "home-carousel-row-view-more";

    const titleText = "eifjao;sdjf;ijkelfasjdfioej;alksdjfa;lisejf;asldkjf;";
    const descriptionText =
      "Experience Milan's Piazza del Duomo—featuring the breathtaking cathedral, historic galleria, and vibrant cultural charm all in one iconic location! Experience Milan's Piazza del Duomo—featuring the breathtaking cathedral,";

    const [showViewMore, setShowViewMore] = useState(false);
    const { focus } = useGlobalNavigationBar();

    const onClickViewMore = useCallback(() => {
      showDialog({
        title: titleText,
        content: descriptionText,
        focusIdOnDismiss: viewMoreId,
      });
    });

    const onKeyDown = useCallback(
      (ev) => {
        if (ev.key === "ArrowLeft") {
          focus(homeContainerKeys.carousel);
        }
      },
      [focus]
    );

    useEffect(() => {
      const target = descriptionRef.current;

      if (target) {
        const showViewMore = target.clientHeight < target.scrollHeight;
        setShowViewMore(showViewMore);
      }
    }, []);

    return (
      <CarouselContainer
        spotlightId={homeContainerKeys.carousel}
        spotlightRestrict="self-only"
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
                width: rem(216),
                height: rem(260),
                background: "tomato",
              }}
            />
          </MapWrapper>

          <Spacing size={60} />

          <RoundButton>Travel Now</RoundButton>
        </ContentWrapper>

        <ArrowButtonWrapper>
          <ArrowRightButton />
        </ArrowButtonWrapper>
      </CarouselContainer>
    );
  },
  (prev, next) => true
);
