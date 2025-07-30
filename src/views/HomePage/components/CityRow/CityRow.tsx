import React, { useMemo } from "react";

import Spotlight from "@enact/spotlight";

import ScrollableRow from "../../../../components/Scrollables/ScrollableRow";
import { useScrollableRow } from "../../../../components/Scrollables/useScrollableRow";
import Text from "../../../../components/Texts/Text";
import {
  cityCardGap,
  cityCardHeight,
  cityCardSmallWidth,
  cityCardWidth,
  homeContainerKeys,
} from "../../../../core/constants/globalConstant";
import { translate } from "../../../../utils/translate";
import { RelativeBox, SectionWrapper } from "./CityRow.style";
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

const CityRow = React.memo(
  () => {
    const cardWidth = cityCardWidth;
    const smallCardWidth = cityCardSmallWidth;
    const cardDiff = cardWidth - smallCardWidth;

    const cardHeight = cityCardHeight;
    const cardGap = cityCardGap;

    const {
      ref: scrollerRef,
      onKeyDown,
      onKeyUp,
      scrollToTarget,
    } = useScrollableRow({
      containerId: homeContainerKeys.city,
      contentWidth: smallCardWidth,
      contentGap: cardGap,
      maxDataLength: cards.length,
      onScroll: (index: number, children: React.ReactNode[]) => {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];

          if (child instanceof HTMLElement) {
            if (i !== index) {
              child.classList.remove("selected");
            } else {
              child.classList.add("selected");
            }

            child.classList.remove("hovered");
          }

          const largeId = "home-city-row-large-" + i;
          const large = document.getElementById(largeId);

          if (large instanceof HTMLElement) {
            if (i === index) {
              large.classList.add("selected");
            } else {
              large.classList.remove("selected");
            }

            large.classList.remove("hovered");

            if (Spotlight.getPointerMode()) {
              const targetLargeId = "home-city-row-large-" + index;
              const targetLarge = document.getElementById(targetLargeId);

              targetLarge?.classList.add("hovered");
            }
          }
        }
      },
    });

    const onClicks = useMemo(() => {
      return cards.map((__, index) => {
        return (ev: any) => {
          const targetIndex = index;

          scrollToTarget({ targetIndex: targetIndex });
        };
      });
    }, [scrollToTarget]);

    const onFocuses = useMemo(() => {
      return cards.map((__, index) => {
        return (ev: any) => {
          if (!Spotlight.getPointerMode()) {
            scrollToTarget({ targetIndex: index });
          }
        };
      });
    }, [scrollToTarget]);

    const onKeyDowns = useMemo(() => {
      return cards.map((__, index) => {
        return (ev: React.KeyboardEvent) => onKeyDown(ev, index);
      });
    }, [onKeyDown]);

    const onKeyUps = useMemo(() => {
      return cards.map(
        (__, index) => (ev: React.KeyboardEvent) => onKeyUp(ev, index)
      );
    }, [onKeyUp]);

    const onMouseEnters = useMemo(() => {
      return cards.map((__, index) => {
        return (ev: any) => {
          const smallId = "home-city-row-small-" + index;
          const el = document.getElementById(smallId);

          if (el instanceof HTMLElement) {
            el.classList.add("hovered");
          }

          for (let i = 0; i < cards.length; i++) {
            const largeId = "home-city-row-large-" + i;
            const large = document.getElementById(largeId);

            if (large instanceof HTMLElement) {
              if (large.classList.contains("selected")) {
                if (i === index) {
                  large.classList.remove("hovered");
                } else {
                  large.classList.add("hovered");
                }
              }
            }
          }
        };
      });
    }, []);

    const onMouseLeaves = useMemo(() => {
      return cards.map((__, index) => {
        return (ev: any) => {
          const smallId = "home-city-row-small-" + index;
          const el = document.getElementById(smallId);

          if (el instanceof HTMLElement) {
            el.classList.remove("hovered");
          }

          for (let i = 0; i < cards.length; i++) {
            const largeId = "home-city-row-large-" + i;
            const large = document.getElementById(largeId);

            if (large instanceof HTMLElement) {
              if (!Spotlight.getPointerMode()) {
                large.classList.remove("hovered");
              }
            }
          }

          const current = Spotlight.getCurrent();

          if (current instanceof HTMLElement) {
            const currentId = current.id;
            const largeId = "home-city-row-large-" + index;

            if (currentId === smallId) {
              const large = document.getElementById(largeId);

              if (large instanceof HTMLElement) {
                large.classList.add("hovered");
              }
            }
          }
        };
      });
    }, []);

    const smallCards = useMemo(() => {
      return cards.map((card, index) => {
        return (
          <SmallCard
            index={index}
            cardWidth={smallCardWidth}
            cardHeight={cardHeight}
            cardDiff={cardDiff}
            card={card}
            onClick={onClicks[index]}
            onFocus={onFocuses[index]}
            onKeyDown={onKeyDowns[index]}
            onKeyUp={onKeyUps[index]}
            onMouseEnter={onMouseEnters[index]}
            onMouseLeave={onMouseLeaves[index]}
          />
        );
      });
    }, [
      smallCardWidth,
      cardHeight,
      cardDiff,
      onFocuses,
      onKeyDowns,
      onKeyUps,
      onClicks,
      onMouseEnters,
      onMouseLeaves,
    ]);

    const largeCards = useMemo(() => {
      return cards.map((card, index) => {
        return (
          <LargeCard
            index={index}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            card={card}
          />
        );
      });
    }, [cardWidth, cardHeight]);

    return (
      <SectionWrapper $marginLeft={180}>
        <Text textStyle="titleMdSb">
          {translate("destinations.placesMemories")}
        </Text>

        <RelativeBox>
          <ScrollableRow
            spotlightId={homeContainerKeys.city}
            scrollerRef={scrollerRef}
            $marginLeft={180}
            $gap={24}
          >
            {smallCards}
          </ScrollableRow>
          {largeCards}
        </RelativeBox>
      </SectionWrapper>
    );
  },
  (prev, next) => true
);

export default CityRow;
