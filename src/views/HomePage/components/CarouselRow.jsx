import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import GradientBottomComponent from "../../../../assets/gradients/GradientCarouselBottom";
import GradientLeftComponent from "../../../../assets/gradients/GradientCarouselLeft";
import ArrowRightButton from "../../../components/Buttons/ArrowButtons/ArrowRightButton";
import RoundButton from "../../../components/Buttons/RoundButton/RoundButton";
import ViewMoreSmallButton from "../../../components/Buttons/ViewMoreButtons/ViewMoreSmallButton";
import Spacing from "../../../components/Spacing/Spacing";
import MarqueeText from "../../../components/Texts/MarqueeText";
import Text from "../../../components/Texts/Text";
import { useDialog } from "../../../hooks/useDialog";
import { rem } from "../../../utils/rem";

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
});

const CarouselWrapper = styled.div`
  position: relative;

  margin-left: -130px;

  width: 100vw;
  height: 100vh;

  background: red;
`;

const CarouselContainer = SpotlightContainerDecorator(CarouselWrapper);

const VideoWrapper = styled.div`
  position: absolute;

  width: 100vw;
  height: 100vh;
`;

const GradientBottom = styled.div`
  position: absolute;
  bottom: 0;

  width: 100vw;
  height: 40vh;

  overflow: hidden;
`;

const GradientLeft = styled.div`
  position: absolute;
  width: 67vw;
  height: 100vh;

  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 150px;
  left: 180px;

  width: 817px;
  height: fit-content;
`;

const HeaderText = styled(MarqueeText)``;

const InfoWrapper = styled.div`
  display: flex;

  & :not(:last-child) {
    display: flex !important;
    align-items: center;

    &::after {
      display: block;
      content: "";

      width: 6px;
      height: 6px;
      background: ${({ theme }) => theme.colors.deactive.normal};

      margin: 0 10px;
      border-radius: 50%;
    }
  }
`;

const MoreWrapper = styled.div`
  height: ${rem(81)};
`;

const MapWrapper = styled.div`
  margin: 0 ${rem(33)};
`;

const ArrowButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;

  transform: tralslateY(-50%);
`;
