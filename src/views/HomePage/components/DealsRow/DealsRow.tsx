import React, { useCallback } from "react";
import styled from "styled-components";

import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import RoundButton from "../../../../components/Buttons/RoundButton/RoundButton";
import { useGlobalNavigationBar } from "../../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import SectionWrapper from "../../../../components/Wrapper/SectionWrapper";
import { homeKeys } from "../../../../core/constants/globalConstant";
import { translate } from "../../../../utils/translate";
import { useHomePageSroll } from "../../useHomePageScroll";

export default React.memo(() => {
  const { focus } = useGlobalNavigationBar();
  const { homeScrollTo } = useHomePageSroll();

  const onRowKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        ev.stopPropagation();
        homeScrollTo(homeKeys.favorite, "center");
      } else if (ev.key === "ArrowDown") {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    [homeScrollTo]
  );

  const onRowClick = useCallback(() => {
    homeScrollTo(homeKeys.deals, "center");
  }, [homeScrollTo]);

  const onWatchVideoKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        ev.stopPropagation();
        focus(homeKeys.deals.containerKey);
      }
    },
    [focus]
  );

  const onDiscoverNowKeyDown = useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === "ArrowRight") {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, []);

  return (
    <SectionWrapper
      id={homeKeys.deals.sectionKey}
      $marginLeft={180}
      onKeyDown={onRowKeyDown}
      onClick={onRowClick}
    >
      <Text textStyle="titleMdSb">{translate("travel.travelDeals")}</Text>
      <Spacing size={24} />
      <ImageWrapper>
        <ButtonContainer
          spotlightId={homeKeys.deals.containerKey}
          spotlightRestrict="self-first"
        >
          <RoundButton onKeyDown={onWatchVideoKeyDown}>Watch Video</RoundButton>
          <RoundButton onKeyDown={onDiscoverNowKeyDown}>
            Discover Now
          </RoundButton>
        </ButtonContainer>
      </ImageWrapper>
    </SectionWrapper>
  );
});

const ImageWrapper = styled.div`
  position: relative;

  width: calc(100% - 56px);
  height: 700px;

  margin-right: 56px;

  background: orange;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 70px;
  bottom: 118px;

  display: flex;

  & > :not(:last-child) {
    margin-right: 24px;
  }
`;

const ButtonContainer = SpotlightContainerDecorator(ButtonWrapper);
