import React, { useCallback, useEffect, useMemo, useState } from "react";

import Spotlight from "@enact/spotlight";

import CityItem from "src/entities/homeSection/CityItem";
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
import HomeSection from "../../../../entities/homeSection/HomeSection";
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
  }, [scrollToTarget]);

  const onClicks = useMemo(() => {
    return items.map((__, index) => {
      return () => {
        scrollToTarget({ targetIndex: index });
        setExpandedIndex(index);
      };
    });
  }, [scrollToTarget]);

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
  }, [onKeyDownOnScrollable, onKeyDown]);

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
  }, [onKeyUpOnScrollable, focus, onKeyUp]);

  useEffect(() => {
    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById("home-city-row-small-" + i);

      if (i !== expandedIndex) {
        if (el instanceof HTMLElement) {
          el.classList.remove("focused");
        }
      } else {
        if (el instanceof HTMLElement) {
          el.classList.add("focused");
        }
      }
    }
  }, [expandedIndex]);

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
  //         index={expandedIndex}
  //         cardWidth={cardWidth}
  //         cardHeight={cardHeight}
  //         item={item}
  //       />
  //     );
  //   });
  // }, [cardWidth, cardHeight, expandedIndex]);

  const largeCard = useMemo(() => {
    const target = items[expandedIndex];

    return (
      <LargeCard
        index={expandedIndex}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        item={target}
      />
    );
  }, [cardWidth, cardHeight, expandedIndex]);

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
        {/* {largeCards} */}
        {largeCard}
      </RelativeBox>
    </SectionWrapper>
  );
});

export default CityRow;
