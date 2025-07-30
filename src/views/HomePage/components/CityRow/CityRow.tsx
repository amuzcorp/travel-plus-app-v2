import React, { useCallback, useEffect, useMemo, useState } from "react";

import Spotlight from "@enact/spotlight";

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
} from "../../../../core/constants/globalConstant";
import { translate } from "../../../../utils/translate";
import { useHomePageSroll } from "../../useHomePageScroll";
import { RelativeBox } from "./CityRow.style";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";

const cards = [
  {
    title: "Chiang Mai",
    city: "Thailand",
    location: "Southeast Asia",
    bestTimeToVisit: "Sep-Nov",
    color: "orange",
  },
  {
    title: "London",
    city: "UK",
    location: "Western Europe",
    bestTimeToVisit: "Sep-Nov",
    color: "red",
  },
  {
    title: "Rome",
    city: "Italy",
    location: "Southern Europe",
    bestTimeToVisit: "Sep-Nov",
    color: "green",
  },
  {
    title: "Ester Island",
    city: "Chile",
    location: "South America",
    bestTimeToVisit: "Sep-Nov",
    color: "blue",
  },
  {
    title: "Rome",
    city: "Italy",
    location: "Southern Europe",
    bestTimeToVisit: "Sep-Nov",
    color: "purple",
  },

  {
    title: "Rome",
    city: "Italy",
    location: "Southern Europe",
    bestTimeToVisit: "Sep-Nov",
    color: "purple",
  },
  {
    title: "Rome",
    city: "Italy",
    location: "Southern Europe",
    bestTimeToVisit: "Sep-Nov",
    color: "purple",
  },
  {
    title: "Rome",
    city: "Italy",
    location: "Southern Europe",
    bestTimeToVisit: "Sep-Nov",
    color: "purple",
  },
  {
    title: "Rome",
    city: "Italy",
    location: "Southern Europe",
    bestTimeToVisit: "Sep-Nov",
    color: "purple",
  },
  {
    title: "Rome",
    city: "Italy",
    location: "Southern Europe",
    bestTimeToVisit: "Sep-Nov",
    color: "purple",
  },
];

const CityRow = React.memo(() => {
  const cardWidth = cityCardWidth;
  const smallCardWidth = cityCardSmallWidth;
  const cardDiff = cardWidth - smallCardWidth;

  const cardHeight = cityCardHeight;
  const cardGap = cityCardGap;

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
    maxDataLength: cards.length,
  });

  const { focus, onKeyDownOnScrollable, onKeyUpOnScrollable } =
    useGlobalNavigationBar();
  const { homeScrollTo } = useHomePageSroll();

  const onFocuses = useMemo(() => {
    return cards.map((__, index) => {
      return (ev: any) => {
        if (!Spotlight.getPointerMode()) {
          scrollToTarget({ targetIndex: index });
          setExpandedIndex(index);
        }
      };
    });
  }, [scrollToTarget]);

  const onKeyDowns = useMemo(() => {
    return cards.map((__, index) => {
      return (ev: React.KeyboardEvent) => {
        onKeyDownOnScrollable(ev, index);

        const atRightOffset = cards.length - 1;

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
    return cards.map((__, index) => (ev: React.KeyboardEvent) => {
      const isFocus = onKeyUpOnScrollable(ev, index);

      if (isFocus) {
        ev.preventDefault();
        ev.stopPropagation();
        focus(homeKeys.city.containerKey);
      } else if (index === cards.length - 1 && ev.key === "ArrowRight") {
        ev.preventDefault();
        ev.stopPropagation();
      } else {
        onKeyUp(ev, index);
      }
    });
  }, [onKeyUpOnScrollable, focus, onKeyUp]);

  useEffect(() => {
    for (let i = 0; i < cards.length; i++) {
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
    return cards.map((card, index) => {
      return (
        <SmallCard
          index={index}
          cardWidth={smallCardWidth}
          cardHeight={cardHeight}
          cardDiff={cardDiff}
          card={card}
          onFocus={onFocuses[index]}
          onKeyDown={onKeyDowns[index]}
          onKeyUp={onKeyUps[index]}
        />
      );
    });
  }, [smallCardWidth, cardHeight, cardDiff, onFocuses, onKeyDowns, onKeyUps]);

  const largeCard = useMemo(() => {
    const target = cards[expandedIndex];

    return (
      <LargeCard
        index={expandedIndex}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        card={target}
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
      <Text textStyle="titleMdSb">
        {translate("destinations.placesMemories")}
      </Text>

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
