import SpotlightContainerDecorator, {
  SpotlightContainerDecoratorConfig,
  SpotlightContainerDecoratorProps,
} from "@enact/spotlight/SpotlightContainerDecorator";
import React from "react";
import styled from "styled-components";

interface ScrollableRowProps extends SpotlightContainerDecoratorProps {
  scrollerRef: React.RefObject<any>;
  spotlightId: string;
  $marginLeft?: number;
  $gap?: number;
  $spaceOfContent?: number;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  children?: React.ReactNode;
}

export default React.memo(
  ({
    spotlightId,
    scrollerRef,
    $marginLeft = 0,
    $gap = 24,
    onKeyDown = (ev: React.KeyboardEvent) => {},
    children,
  }: ScrollableRowProps) => {
    return (
      <NormalizeWrapper>
        <ScrollWrapper $marginLeft={$marginLeft}>
          <SpottableWrapper
            id={spotlightId}
            spotlightId={spotlightId}
            onKeyDown={onKeyDown}
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

const spotlightConfig: SpotlightContainerDecoratorConfig = {
  restrict: "self-first",
  enterTo: "last-focused",
};

const SpottableWrapper = SpotlightContainerDecorator(
  spotlightConfig,
  RowWrapper
);

const NormalizeWrapper = styled.div`
  position: relative;
`;

const ScrollWrapper = styled.div<{ $marginLeft: number }>`
  display: flex;

  overflow: hidden;

  margin-left: -${({ $marginLeft }) => $marginLeft ?? 0}px;

  padding: 24px 0;
`;
