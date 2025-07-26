import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

interface ScrollableRow {
  scrollerRef: React.RefObject<any>;
  $marginLeft?: number;
  $gap?: number;
  $spaceOfContent?: number;
  children?: React.ReactNode;
}

export default React.memo(
  ({
    scrollerRef,
    $marginLeft = 0,
    $gap = 24,
    $spaceOfContent = 0,
    children,
  }: ScrollableRow) => {
    const scrollHandler = useCallback(() => {
      const spottableChildren = Spotlight.getSpottableDescendants(
        "scrollable-row-container"
      );

      let foundFirstView = false;

      for (let i = 0; i < spottableChildren.length; i++) {
        const child = spottableChildren[i];

        if (child instanceof Element) {
          const current = child.getBoundingClientRect();
          const currentWidth = current.width;
          const currentLeft = current.left;

          const diff = $marginLeft - currentWidth;

          child.classList.remove("space");

          if (currentLeft < diff) {
            child.classList.add("hided");
          } else {
            child.classList.remove("hided");

            if (!foundFirstView) {
              child.classList.add("space");
              foundFirstView = true;
            }
          }
        }
      }
    }, [$marginLeft]);

    useEffect(() => {
      const el = scrollerRef.current;

      el?.addEventListener("scroll", scrollHandler);

      return () => {
        el?.removeEventListener("scroll", scrollHandler);
      };
    }, [scrollerRef, scrollHandler]);

    return (
      <NormalizeWrapper>
        <ScrollWrapper ref={scrollerRef} $marginLeft={$marginLeft}>
          <SpottableWrapper
            $marginLeft={$marginLeft}
            $gap={$gap}
            $spaceOfContent={$spaceOfContent}
            spotlightId="scrollable-row-container"
          >
            {children}
          </SpottableWrapper>
        </ScrollWrapper>
      </NormalizeWrapper>
    );
  }
);

const Wrapper = styled.div<{
  $marginLeft: number;
  $gap: number;
  $spaceOfContent: number;
}>`
  position: relative;

  display: flex;

  padding-left: ${({ $marginLeft }) => `${$marginLeft}px`};

  & > :not(:last-child) {
    margin-right: ${({ $gap }) => `${$gap}px`};
  }

  & > .hided {
    background: yellow;

    opacity: 0.3;
  }

  & > .space {
    padding-right: ${({ $spaceOfContent }) => `${$spaceOfContent}px`};
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
