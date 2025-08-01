import { domAnimation, LazyMotion, motion } from "motion/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Spotlight from "@enact/spotlight";

import CityItem from "src/entities/HomeSection/CityItem";
import styled from "styled-components";
import { useGlobalNavigationBar } from "../../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import ScrollableRow from "../../../../components/Scrollables/ScrollableRow";
import { useScrollableRow } from "../../../../components/Scrollables/useScrollableRow";
import Text from "../../../../components/Texts/Text";
import SectionWrapper from "../../../../components/Wrapper/SectionWrapper";
import {
  cityCardGap,
  cityCardHeight,
  cityCardSmallWidth,
  cityCardWidth,
  homeKeys,
} from "../../../../constants/globalConstant";
import HomeSection from "../../../../entities/HomeSection/HomeSection";
import { useHomePageSroll } from "../../useHomePageScroll";
import { RelativeBox } from "./CityRow.style";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";

const CityRow = React.memo(({ section }: { section: HomeSection }) => {
  const cardWidth = cityCardWidth;
  const smallCardWidth = cityCardSmallWidth;
  const cardDiff = cardWidth - smallCardWidth;

  const cardHeight = cityCardHeight;
  const cardGap = cityCardGap;

  const items = section.items as CityItem[];

  const [expandedIndex, setExpandedIndex] = useState(0);

  const prevIndexRef = useRef<number | null>(null);
  const prevIndex = prevIndexRef.current;

  const {
    ref: scrollerRef,
    onKeyDown,
    onKeyUp,
    scrollToTarget,
  } = useScrollableRow({
    containerId: homeKeys.city.containerKey,
    contentWidth: smallCardWidth,
    contentGap: cardGap,
    maxDataLength: items.length,
  });

  const { focus, onKeyDownOnScrollable, onKeyUpOnScrollable } =
    useGlobalNavigationBar();
  const { homeScrollTo } = useHomePageSroll();

  const onFocuses = useMemo(() => {
    return items.map((__, index) => {
      return (ev: any) => {
        if (!Spotlight.getPointerMode()) {
          scrollToTarget({ targetIndex: index });
          setExpandedIndex(index);
        }
      };
    });
  }, [items, scrollToTarget]);

  const onClicks = useMemo(() => {
    return items.map((__, index) => {
      return () => {
        scrollToTarget({ targetIndex: index });
        setExpandedIndex(index);
      };
    });
  }, [items, scrollToTarget]);

  const onKeyDowns = useMemo(() => {
    return items.map((__, index) => {
      return (ev: React.KeyboardEvent) => {
        onKeyDownOnScrollable(ev, index);

        const atRightOffset = items.length - 1;

        const atRight = ev.key === "ArrowRight" && index === atRightOffset;
        const atLeft = ev.key === "ArrowLeft" && index === 0;

        if (atLeft || atRight) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          const targetIndex = onKeyDown(ev, index);

          if (targetIndex !== -1) {
            setExpandedIndex(targetIndex);
          }
        }
      };
    });
  }, [items, onKeyDownOnScrollable, onKeyDown]);

  const onKeyUps = useMemo(() => {
    return items.map((__, index) => (ev: React.KeyboardEvent) => {
      const isFocus = onKeyUpOnScrollable(ev, index);

      if (isFocus) {
        ev.preventDefault();
        ev.stopPropagation();
        focus(homeKeys.city.containerKey);
      } else if (index === items.length - 1 && ev.key === "ArrowRight") {
        ev.preventDefault();
        ev.stopPropagation();
      } else {
        onKeyUp(ev, index);
      }
    });
  }, [items, onKeyUpOnScrollable, focus, onKeyUp]);

  useEffect(() => {
    prevIndexRef.current = expandedIndex;

    for (let i = 0; i < items.length; i++) {
      const small = document.getElementById("home-city-row-small-" + i);
      // const large = document.getElementById("home-city-row-large-" + i);

      if (i !== expandedIndex) {
        if (small instanceof HTMLElement) {
          small.classList.remove("focused");
        }

        // if (large instanceof HTMLElement) {
        //   large.classList.remove("selected");
        // }
      } else {
        if (small instanceof HTMLElement) {
          small.classList.add("focused");
        }

        // if (large instanceof HTMLElement) {
        //   large.classList.add("selected");
        // }
      }
    }
  }, [items, expandedIndex]);

  const direction = useMemo(() => {
    if (prevIndex === null) {
      return 0;
    }

    return expandedIndex > prevIndex ? 1 : -1;
  }, [expandedIndex, prevIndex]);

  const renderIndices = useMemo(() => {
    const arr = [expandedIndex - 1, expandedIndex, expandedIndex + 1].filter(
      (i) => i >= 0 && i < items.length
    );

    return Array.from(new Set(arr));
  }, [expandedIndex, items.length]);

  const transition = useMemo(() => {
    return {
      duration: 0.35,
      ease: "easeInOut" as const,
    };
  }, []);

  const smallCards = useMemo(() => {
    return items.map((item, index) => {
      return (
        <SmallCard
          index={index}
          cardWidth={smallCardWidth}
          cardHeight={cardHeight}
          cardDiff={cardDiff}
          item={item}
          onFocus={onFocuses[index]}
          onClick={onClicks[index]}
          onKeyDown={onKeyDowns[index]}
          onKeyUp={onKeyUps[index]}
        />
      );
    });
  }, [
    items,
    smallCardWidth,
    cardHeight,
    cardDiff,
    onClicks,
    onFocuses,
    onKeyDowns,
    onKeyUps,
  ]);

  // const largeCards = useMemo(() => {
  //   return items.map((item, index) => {
  //     return (
  //       <LargeCard
  //         index={index}
  //         cardWidth={cardWidth}
  //         cardHeight={cardHeight}
  //         item={item}
  //       />
  //     );
  //   });
  // }, [cardWidth, cardHeight, expandedIndex]);

  // const largeCard = useMemo(() => {
  //   const target = items[expandedIndex];

  //   return (
  //     <LargeCard
  //       index={expandedIndex}
  //       cardWidth={cardWidth}
  //       cardHeight={cardHeight}
  //       item={target}
  //     />
  //   );
  // }, [items, cardWidth, cardHeight, expandedIndex]);

  const onRowKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        ev.stopPropagation();
        homeScrollTo(homeKeys.carousel, "center");
      } else if (ev.key === "ArrowDown") {
        ev.preventDefault();
        ev.stopPropagation();
        homeScrollTo(homeKeys.favorite, "center");
      }
    },
    [homeScrollTo]
  );

  const onClickWrapper = useCallback(() => {
    homeScrollTo(homeKeys.city, "center");
  }, [homeScrollTo]);

  return (
    <SectionWrapper
      id={homeKeys.city.sectionKey}
      $marginLeft={180}
      onClick={onClickWrapper}
    >
      <Text textStyle="titleMdSb">{section.title}</Text>

      <RelativeBox>
        <ScrollableRow
          spotlightId={homeKeys.city.containerKey}
          scrollerRef={scrollerRef}
          onKeyDown={onRowKeyDown}
          $marginLeft={180}
          $gap={24}
        >
          {smallCards}
        </ScrollableRow>
        <LazyMotion features={domAnimation}>
          {renderIndices.map((i) => {
            const item = items[i];
            const isActive = i === expandedIndex;
            const wasActive = prevIndex === i;

            let animate = {
              opacity: 1,
            };
            let initial = animate;

            if (isActive) {
              initial =
                direction === 0
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                    };
              animate = {
                opacity: 1,
              };
            } else if (wasActive) {
              initial = {
                opacity: 1,
              };
              animate = {
                opacity: 0,
              };
            } else {
              initial = {
                opacity: 0,
              };
              animate = {
                opacity: 0,
              };
            }

            const key = (item as any).id ?? i;

            return (
              <MotionLayer
                key={key}
                initial={initial}
                animate={animate}
                aria-hidden
              >
                <LargeCard
                  key={i}
                  index={i}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  item={item}
                />
              </MotionLayer>
            );
          })}
        </LazyMotion>
      </RelativeBox>
    </SectionWrapper>
  );
});

export default CityRow;

const MotionLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
`;
