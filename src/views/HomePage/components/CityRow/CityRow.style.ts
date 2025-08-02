import styled from "styled-components";

import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import { motion } from "motion/react";

export const CardBase = styled.div<{
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

export const RelativeBox = styled.div`
  position: relative;

  margin-bottom: -24px;
`;

export const RowWrapper = styled.div`
  position: relative;

  display: flex;

  padding-left: 180px;
  padding-right: calc(100vw - 180px);

  transition: transform ease 0.3s;

  & > :not(:last-child) {
    margin-right: 24px;
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

export const MotionLayer = styled(motion.div)`
  position: absolute;
  inset: 0;

  pointer-events: none;
`;
