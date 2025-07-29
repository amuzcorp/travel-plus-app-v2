import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import React from "react";
import styled from "styled-components";

interface ScrollableColumnProps {
  scrollerRef: React.RefObject<any>;
  spotlightId: string;
  $marginTop?: number;
  $gap?: number;
  $spaceOfContent?: number;
  children?: React.ReactNode;
}

export default React.memo(
  ({
    spotlightId,
    scrollerRef,
    $marginTop = 0,
    $gap = 24,
    children,
  }: ScrollableColumnProps) => {
    return (
      <NormalizeWrapper>
        <ScrollWrapper $marginTop={$marginTop}>
          <SpottableWrapper
            id={spotlightId}
            spotlightId={spotlightId}
            $marginTop={$marginTop}
            $gap={$gap}
          >
            {children}
          </SpottableWrapper>
        </ScrollWrapper>
      </NormalizeWrapper>
    );
  }
);

const ColumnWrapper = styled.div<{ $marginTop: number; $gap: number }>`
  position: relative;

  display: flex;
  flex-direction: column;

  padding-top: ${({ $marginTop }) => $marginTop ?? 0}px;
  padding-bottom: ${({ $marginTop }) => `calc(100vh - ${$marginTop ?? 0}px)`};

  transition: transform ease 0.3s;

  & > :not(:last-child) {
    margin-bottom: ${({ $gap }) => $gap ?? 0}px;
  }
`;

const SpottableWrapper = SpotlightContainerDecorator(ColumnWrapper);

const NormalizeWrapper = styled.div`
  position: relative;
`;

const ScrollWrapper = styled.div<{ $marginTop: number }>`
  display: flex;
  flex-direction: column;

  overflow-x: visible;
  overflow-y: hidden;

  margin-top: -${({ $marginTop }) => $marginTop ?? 0}px;
`;
