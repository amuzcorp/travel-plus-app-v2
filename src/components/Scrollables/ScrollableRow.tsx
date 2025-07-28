import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import React from "react";
import styled from "styled-components";

interface ScrollableRow {
  scrollerRef: React.RefObject<any>;
  spotlightId: string;
  $marginLeft?: number;
  $gap?: number;
  $spaceOfContent?: number;
  children?: React.ReactNode;
}

export default React.memo(
  ({
    spotlightId,
    scrollerRef,
    $marginLeft = 0,
    $gap = 24,
    children,
  }: ScrollableRow) => {
    return (
      <NormalizeWrapper>
        <ScrollWrapper>
          <SpottableWrapper
            id={spotlightId}
            spotlightId={spotlightId}
            $marginLeft={$marginLeft}
            $gap={$gap}
          >
            {children}
          </SpottableWrapper>
        </ScrollWrapper>
      </NormalizeWrapper>
    );
  }
);

export const RowWrapper = styled.div<{ $marginLeft: number; $gap: number }>`
  position: relative;

  display: flex;

  padding-left: ${({ $marginLeft }) => $marginLeft ?? 0}px;
  padding-right: ${({ $marginLeft }) => `calc(100vw - ${$marginLeft ?? 0}px)`};

  transition: transform ease 0.3s;

  & > :not(:last-child) {
    margin-right: ${({ $gap }) => $gap ?? 0}px;
  }
`;

export const SpottableWrapper = SpotlightContainerDecorator(RowWrapper);

export const NormalizeWrapper = styled.div`
  position: relative;
`;

export const ScrollWrapper = styled.div`
  display: flex;

  overflow-x: hidden;
  overflow-y: visible;

  margin-left: -180px;

  padding: 24px 0;
`;
