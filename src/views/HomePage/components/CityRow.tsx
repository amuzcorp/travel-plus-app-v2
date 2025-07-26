import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import BaseAccessibleComponent from "../../../components/BaseAccessibleComponent";
import Spacing from "../../../components/Spacing/Spacing";
import Text from "../../../components/Texts/Text";
import {
  cityCardGap,
  cityCardHeight,
  cityCardSmallWidth,
  cityCardWidth,
} from "../../../core/constants/globalConstant";

const CityRow = React.memo(() => {
  const cardWidth = cityCardWidth;
  const smallCardWidth = cityCardSmallWidth;
  const cardDiff = cardWidth - smallCardWidth;

  const cardHeight = cityCardHeight;
  const cardGap = cityCardGap;

  const scrollChildRef = useRef<any>(null);

  // const [selectedIndex, setSelectedIndex] = useState(0);

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
    (targetIndex: number) => {
      // setSelectedIndex(targetIndex);
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

      const el = document.getElementById("home-city-row-container");

      if (el instanceof HTMLElement) {
        el.style.transform = `translateX(-${targetOffset}px)`;
      }
    },
    [
      // setSelectedIndex,
      cardGap,
      smallCardWidth,
    ]
  );

  useEffect(() => {
    scrollToTarget(0);
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

        if (ev.key === "ArrowRight") {
          targetIndex = Math.min(index + 1, cards.length - 1);
        } else if (ev.key === "ArrowLeft") {
          targetIndex = Math.max(index - 1, 0);
        }

        scrollToTarget(targetIndex);
      };
    });
  }, [cards, scrollToTarget]);

  const onMouseEnters = useMemo(() => {
    return cards.map((__, index) => {
      return (ev: any) => {
        const smallId = "home-city-row-small-" + index;
        const el = document.getElementById(smallId);

        const focused = Spotlight.getCurrent();

        let isSelected = false;

        console.log(focused instanceof HTMLElement);

        if (focused instanceof HTMLElement) {
          if (focused.classList.contains("hovered")) {
            isSelected = true;
          }
        }

        if (el instanceof HTMLElement) {
          el.classList.add("hovered");
        }

        // const large = document.getElementById("home-city-row-large-" + index);

        // if (large instanceof HTMLElement) {
        //   if (isSelected) {
        //     large.classList.add("hovered");
        //   }
        // }

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

          console.log(currentId);
          console.log(smallId);

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
    <div
      style={{
        position: "relative",
        width: "calc(100vw - 180px)",
        background: "brown",
        marginLeft: "180px",
      }}
    >
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
      <Spacing size={90} />
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
              </LeftSection>
            </LargeCardWrapper>
          </LargeCard>
        );
      })}
    </div>
  );
});

export default CityRow;

const CardBase = styled.div<{
  $cardWidth: number;
  $cardHeight: number;
  $background: string;
}>`
  width: ${({ $cardWidth }) => $cardWidth}px;
  height: ${({ $cardHeight }) => $cardHeight}px;

  background: ${({ $background }) => $background};

  border-radius: 12px;

  box-shadow: ${({ theme }) =>
    `inset 0 0 0 1px ${theme.colors.deactive.normal}`};

  &::before {
    position: absolute;

    width: 100%;
    height: 100%;
    content: "";

    display: block;

    background: rgba(0, 0, 0, 0.4);

    border-radius: 12px;
  }
`;

const LargeCard = styled(CardBase)`
  position: absolute;
  top: 24px;
  left: 0;

  outline: 3px solid #e6e6e6;

  pointer-events: none;

  opacity: 0;

  &.selected {
    opacity: 1;
  }

  &.hovered {
    outline: ${({ theme }) => `3px solid ${theme.colors.text.focused}`};
  }

  /* transition: opacity linear 0.3s; */
`;

const LargeCardWrapper = styled.div`
  position: relative;
`;

const LeftSection = styled.div`
  position: absolute;
  top: 76px;

  left: 70px;

  width: 496px;
`;

const SmallCard = styled(CardBase)<{ $cardDiff: number }>`
  position: relative;

  opacity: 1;

  transition: opacity ease 0.5s, transform ease 0.1s;

  &:focus {
  }

  &.selected {
    opacity: 0;

    padding-right: ${({ $cardDiff }) => $cardDiff}px;
    /* transform: ${({ $cardWidth, $cardDiff }) =>
      `scaleX(${($cardWidth + $cardDiff) / $cardWidth})`}; */
  }

  &.hovered {
    outline: 3px solid #e6e6e6;
  }
`;

const SmallCardTitle = styled(Text)`
  position: absolute;
  bottom: 46px;
  left: 40px;
  right: 40px;

  background: tan;
`;

const RowWrapper = styled.div`
  position: relative;

  display: flex;

  padding-left: 180px;
  padding-right: calc(100vw - 180px);

  transition: transform ease 0.3s;

  & :not(:last-child) {
    margin-right: 24px;
  }
`;

const SpottableWrapper = SpotlightContainerDecorator(RowWrapper);

const NormalizeWrapper = styled.div`
  position: relative;
`;

const ScrollWrapper = styled.div`
  display: flex;

  overflow-x: hidden;
  overflow-y: visible;

  margin-left: -180px;

  padding: 24px 0;
`;
