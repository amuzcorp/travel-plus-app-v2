import React, { useCallback, useEffect, useRef, useState } from "react";

import GradientBottomComponent from "../../../../../assets/gradients/GradientCarouselBottom";
import GradientLeftComponent from "../../../../../assets/gradients/GradientCarouselLeft";
import ArrowRightButton from "../../../../components/Buttons/ArrowButtons/ArrowRightButton";
import RoundButton from "../../../../components/Buttons/RoundButton/RoundButton";
import ViewMoreSmallButton from "../../../../components/Buttons/ViewMoreButtons/ViewMoreSmallButton";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import { useDialog } from "../../../../hooks/useDialog";
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

export default React.memo(({ title, description }) => {
  const descriptionRef = useRef(null);
  const { showDialog } = useDialog();

  const viewMoreId = "home-carousel-row-view-more";

  const titleText = "eifjao;sdjf;ijkelfasjdfioej;alksdjfa;lisejf;asldkjf;";
  const descriptionText =
    "Experience Milan's Piazza del Duomo—featuring the breathtaking cathedral, historic galleria, and vibrant cultural charm all in one iconic location! Experience Milan's Piazza del Duomo—featuring the breathtaking cathedral,";

  const [showViewMore, setShowViewMore] = useState(false);

  useEffect(() => {
    const target = descriptionRef.current;

    if (target) {
      const showViewMore = target.clientHeight < target.scrollHeight;
      setShowViewMore(showViewMore);
    }
  }, []);

  const onClickViewMore = useCallback(() => {
    showDialog({
      title: titleText,
      content: descriptionText,
      focusIdOnDismiss: viewMoreId,
    });
  });

  useEffect(() => {
    console.log(viewMoreId);
    // Spotlight.focus(viewMoreId);
  }, []);

  return (
    <CarouselContainer>
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
              width: "216px",
              height: "260px",
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
});
