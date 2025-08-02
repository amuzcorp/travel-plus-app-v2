import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import ArrowRightButton from "../../../../components/Buttons/ArrowButtons/ArrowRightButton";
import RoundButton from "../../../../components/Buttons/RoundButton/RoundButton";
import { useGlobalNavigationBar } from "../../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import DotIndicator from "../../../../components/Indicators/DotIndicator";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import SectionWrapper from "../../../../components/Wrapper/SectionWrapper";
import { homeKeys } from "../../../../constants/globalConstant";
import AdsItem from "../../../../entities/HomeSection/AdsItem";
import HomeSection from "../../../../entities/HomeSection/HomeSection";
import { useHomePageSroll } from "../../useHomePageScroll";

export default React.memo(
  ({ section }: { section: HomeSection }) => {
    const { focus } = useGlobalNavigationBar();
    const { prevSection, currentSection, homeScrollTo } = useHomePageSroll({
      currentSection: "deals",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const getNextIndex = useCallback((): number => {
      let nextIndex = selectedIndex + 1;

      if (nextIndex === section.items.length) {
        nextIndex = 0;
      }

      return nextIndex;
    }, [section.items.length, selectedIndex]);

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

    const onWatchVideoKeyDowns = useMemo(() => {
      return section.items.map((item, index) => {
        const visibleDiscover = (item as AdsItem).hasDiscoverNow;

        return (ev: React.KeyboardEvent) => {
          if (ev.key === "ArrowLeft") {
            ev.preventDefault();
            ev.stopPropagation();
            focus(homeKeys.deals.containerKey);
          } else if (ev.key === "ArrowRight") {
            if (!visibleDiscover) {
              ev.preventDefault();
              ev.stopPropagation();
              setSelectedIndex(getNextIndex());
            }
          }
        };
      });
    }, [focus, section, getNextIndex]);

    const onDiscoverNowKeyDown = useCallback(
      (ev: React.KeyboardEvent) => {
        if (ev.key === "ArrowRight") {
          ev.preventDefault();
          ev.stopPropagation();

          const nextIndex = getNextIndex();

          const nextItem = section.items[nextIndex] as AdsItem;
          const visibleWatchVideo = nextItem.hasWatchVideo;

          if (visibleWatchVideo) {
            Spotlight.move("left");
          }

          setSelectedIndex(nextIndex);
        }
      },
      [section, getNextIndex]
    );

    const onClickArrowRight = useCallback(() => {
      setSelectedIndex(getNextIndex());
    }, [getNextIndex]);

    useEffect(() => {
      for (let i = 0; i < section.items.length; i++) {
        const image = document.getElementById("home-deals-row-bg-" + i);

        if (image instanceof HTMLElement) {
          if (i === selectedIndex) {
            image.classList.add("visible");
          } else {
            image.classList.remove("visible");
          }
        }
      }
    }, [section.items.length, selectedIndex]);

    const buttons = useMemo(() => {
      const item = section.items[selectedIndex] as AdsItem;

      const visibleWatch = item.hasWatchVideo;
      const visibleDiscover = item.hasDiscoverNow;

      return (
        <ButtonContainer
          spotlightId={homeKeys.deals.containerKey}
          spotlightRestrict="self-first"
        >
          {visibleWatch && (
            <RoundButton onKeyDown={onWatchVideoKeyDowns[selectedIndex]}>
              Watch Video
            </RoundButton>
          )}
          {visibleDiscover && (
            <RoundButton onKeyDown={onDiscoverNowKeyDown}>
              Discover Now
            </RoundButton>
          )}
        </ButtonContainer>
      );
    }, [
      section.items,
      selectedIndex,
      onWatchVideoKeyDowns,
      onDiscoverNowKeyDown,
    ]);

    const indicator = useMemo(() => {
      return (
        <IndicatorWrapper>
          <DotIndicator
            length={section.items.length}
            selectedIndex={selectedIndex}
          />
        </IndicatorWrapper>
      );
    }, [section.items.length, selectedIndex]);

    const arrowRightButton = useMemo(() => {
      return (
        <ArrowRightWrapper>
          <ArrowRightButton onClick={onClickArrowRight} />
        </ArrowRightWrapper>
      );
    }, [onClickArrowRight]);

    return (
      <SectionWrapper
        id={homeKeys.deals.sectionKey}
        $marginLeft={180}
        onKeyDown={onRowKeyDown}
        onClick={onRowClick}
      >
        <Text textStyle="titleMdSb">{section.title}</Text>
        <Spacing size={24} />
        <ImageContainer>
          {section.items.map((item, index) => {
            return (
              <BackgroundImage
                id={"home-deals-row-bg-" + index}
                src={(item as AdsItem).imageUrl}
                alt={"home-deals-row-bg-" + index}
              />
            );
          })}
          {buttons}
          {indicator}
          {arrowRightButton}
        </ImageContainer>
      </SectionWrapper>
    );
  },
  (prev, next) => prev.section === next.section
);

const ImageContainer = styled.div`
  position: relative;

  width: calc(100% - 56px);
  height: 700px;

  margin-right: 56px;

  border-radius: 12px;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;

  width: 100%;
  height: 100%;

  object-fit: cover;

  opacity: 0;

  &.visible {
    opacity: 1;
  }
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

const IndicatorWrapper = styled.div`
  position: absolute;
  left: 70px;
  bottom: 50px;
`;

const ArrowRightWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;

  transform: translateY(-50%);
`;
