import React, { useCallback, useEffect, useMemo, useRef } from "react";

import Spotlight from "@enact/spotlight";

import BaseAccessibleComponent from "../../../../components/BaseAccessibleComponent";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import {
  cityCardGap,
  cityCardHeight,
  cityCardSmallWidth,
  cityCardWidth,
} from "../../../../core/constants/globalConstant";
import { translate } from "../../../../utils/translate";
import {
  Description,
  LargeCard,
  LargeCardWrapper,
  LeftSection,
  NormalizeWrapper,
  RelativeBox,
  RightSection,
  ScrollWrapper,
  SectionWrapper,
  SmallCard,
  SmallCardTitle,
  SpottableWrapper,
} from "./CityRow.style";

const CityRow = React.memo(() => {
  const cardWidth = cityCardWidth;
  const smallCardWidth = cityCardSmallWidth;
  const cardDiff = cardWidth - smallCardWidth;

  const cardHeight = cityCardHeight;
  const cardGap = cityCardGap;

  const scrollChildRef = useRef<any>(null);

  const cards = useMemo(() => {
    return [
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
  }, []);

  const scrollToTarget = useCallback(
    (targetIndex: number, useScroll = true) => {
      const targetOffset = targetIndex * (smallCardWidth + cardGap);

      const spottableChildren = Spotlight.getSpottableDescendants(
        "home-city-row-container"
      );

      for (let i = 0; i < spottableChildren.length; i++) {
        const spottableChild = spottableChildren[i];

        if (spottableChild instanceof Element) {
          if (i !== targetIndex) {
            spottableChild.classList.remove("selected");
          } else {
            spottableChild.classList.add("selected");
          }

          spottableChild.classList.remove("hovered");
        }

        const largeId = "home-city-row-large-" + i;
        const large = document.getElementById(largeId);

        if (large instanceof HTMLElement) {
          if (i === targetIndex) {
            large.classList.add("selected");
          } else {
            large.classList.remove("selected");
          }

          large.classList.remove("hovered");

          if (Spotlight.getPointerMode()) {
            const targetLargeId = "home-city-row-large-" + targetIndex;
            const targetLarge = document.getElementById(targetLargeId);

            targetLarge?.classList.add("hovered");
          }
        }
      }

      if (useScroll) {
        const el = document.getElementById("home-city-row-container");

        if (el instanceof HTMLElement) {
          el.style.transform = `translateX(-${targetOffset}px)`;
        }
      }
    },
    [cardGap, smallCardWidth]
  );

  useEffect(() => {
    scrollToTarget(0, false);
  }, [scrollToTarget]);

  const onClicks = useMemo(() => {
    return cards.map((__, index) => {
      return (ev: any) => {
        const targetIndex = index;

        scrollToTarget(targetIndex);
      };
    });
  }, [scrollToTarget, cards]);

  const onFocuses = useMemo(() => {
    return cards.map((__, index) => {
      return (ev: any) => {
        if (!Spotlight.getPointerMode()) {
          scrollToTarget(index);
        }
      };
    });
  }, [cards, scrollToTarget]);

  const onKeyDowns = useMemo(() => {
    return cards.map((__, index) => {
      return (ev: React.KeyboardEvent) => {
        let targetIndex = 0;
        let useScroll = false;

        if (ev.key === "ArrowRight") {
          targetIndex = Math.min(index + 1, cards.length - 1);
          useScroll = true;
        } else if (ev.key === "ArrowLeft") {
          targetIndex = Math.max(index - 1, 0);
          useScroll = true;
        }

        if (useScroll) {
          scrollToTarget(targetIndex);
        }
      };
    });
  }, [cards, scrollToTarget]);

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
  }, [cards]);

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
  }, [cards]);

  return (
    <SectionWrapper $marginLeft={180}>
      <Text textStyle="titleMdSb">
        {translate("destinations.placesMemories")}
      </Text>

      <RelativeBox>
        <NormalizeWrapper>
          <ScrollWrapper>
            <SpottableWrapper
              id={"home-city-row-container"}
              spotlightId="home-city-row-container"
              ref={scrollChildRef}
            >
              {cards.map((card, index) => {
                return (
                  <BaseAccessibleComponent
                    id={"home-city-row-small-" + index}
                    component={SmallCard}
                    key={index}
                    $cardWidth={smallCardWidth}
                    $cardHeight={cardHeight}
                    $cardDiff={cardDiff}
                    $background={card.color}
                    onFocus={onFocuses[index]}
                    onKeyDown={onKeyDowns[index]}
                    onClick={onClicks[index]}
                    onMouseEnter={onMouseEnters[index]}
                    onMouseLeave={onMouseLeaves[index]}
                  >
                    <SmallCardTitle textStyle="headerXlSb">
                      {card.title}
                    </SmallCardTitle>
                  </BaseAccessibleComponent>
                );
              })}
            </SpottableWrapper>
          </ScrollWrapper>
        </NormalizeWrapper>

        {cards.map((card, index) => {
          return (
            <LargeCard
              id={"home-city-row-large-" + index}
              $cardWidth={cardWidth}
              $cardHeight={cardHeight}
              $background={card.color}
              key={index}
            >
              <LargeCardWrapper>
                <LeftSection>
                  <Text textStyle="headerHugeSb">{card.title}</Text>
                  <Spacing size={16} />
                  <Text textStyle="titleMdSb">
                    <Description>
                      <div>{card.city}</div>
                      <div>{card.location}</div>
                    </Description>
                  </Text>
                  <Spacing size={8} />
                  <Text textStyle="titleMdSb">
                    Best Time to visit : {card.bestTimeToVisit}
                  </Text>
                </LeftSection>
                <RightSection>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "darkkhaki",
                      borderRadius: "12px",
                    }}
                  >
                    <span>
                      <p>123123</p>
                      <p>{card.title}</p>
                    </span>
                  </div>
                </RightSection>
              </LargeCardWrapper>
            </LargeCard>
          );
        })}
      </RelativeBox>
    </SectionWrapper>
  );
});

export default CityRow;
