import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

interface ScrollableRow {
  scrollerRef: React.RefObject<any>;
  $marginLeft?: number;
  $gap?: number;
  children?: React.ReactNode;
}

export default React.memo(
  ({ scrollerRef, $marginLeft = 0, $gap = 24, children }: ScrollableRow) => {
    const scrollHandler = useCallback(() => {
      const children = Spotlight.getSpottableDescendants(
        "scrollable-row-container"
      );

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (child instanceof Element) {
          const current = child.getBoundingClientRect();
          const currentWidth = current.width;
          const currentLeft = current.left;

          if (currentLeft < $marginLeft - currentWidth) {
            child.classList.add("hided");
          } else {
            child.classList.remove("hided");
          }
        }
      }
    }, []);

    useEffect(() => {
      scrollerRef.current?.addEventListener("scroll", scrollHandler);

      return () => {
        scrollerRef.current?.removeEventListener("scroll", scrollHandler);
      };
    }, []);

    return (
      <NormalizeWrapper>
        <ScrollWrapper ref={scrollerRef} $marginLeft={$marginLeft}>
          <SpottableWrapper
            $marginLeft={$marginLeft}
            $gap={$gap}
            spotlightId="scrollable-row-container"
          >
            {children}
          </SpottableWrapper>
        </ScrollWrapper>
      </NormalizeWrapper>
    );
  }
);

const Wrapper = styled.div<{ $marginLeft: number; $gap: number }>`
  position: relative;

  display: flex;

  padding-left: ${({ $marginLeft }) => `${$marginLeft}px`};

  gap: ${({ $gap }) => `${$gap}px`};

  & > .hided {
    background: yellow;

    opacity: 0.3;
  }
`;

const SpottableWrapper = SpotlightContainerDecorator(Wrapper);

const NormalizeWrapper = styled.div``;

const ScrollWrapper = styled.div<{ $marginLeft: number }>`
  position: relative;

  display: flex;

  overflow-x: scroll;
  overflow-y: visible;

  margin-left: ${({ $marginLeft }) => `-${$marginLeft}px`};

  padding: 24px 0;
`;
