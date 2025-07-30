import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import React from "react";
import styled from "styled-components";

interface ScrollableRowProps {
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
  }: ScrollableRowProps) => {
    return (
      <NormalizeWrapper>
        <ScrollWrapper $marginLeft={$marginLeft}>
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

const RowWrapper = styled.div<{ $marginLeft: number; $gap: number }>`
  position: relative;

  display: flex;

  padding-left: ${({ $marginLeft }) => $marginLeft ?? 0}px;

  transition: transform ease 0.3s;

  & > :not(:last-child) {
    margin-right: ${({ $gap }) => $gap ?? 0}px;
  }
`;

const SpottableWrapper = SpotlightContainerDecorator(RowWrapper);

const NormalizeWrapper = styled.div`
  position: relative;
`;

const ScrollWrapper = styled.div<{ $marginLeft: number }>`
  display: flex;

  overflow: hidden;

  margin-left: -${({ $marginLeft }) => $marginLeft ?? 0}px;

  padding: 24px 0;
`;
