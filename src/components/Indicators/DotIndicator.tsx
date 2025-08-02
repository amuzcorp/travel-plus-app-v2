import React, { useMemo } from "react";
import styled from "styled-components";

export interface DotIndicatorProps {
  selectedIndex?: number;
  length: number;
}

export default React.memo(
  ({ selectedIndex = 0, length }: DotIndicatorProps) => {
    const range = useMemo(() => {
      return Array.from({ length }, (_, i) => i);
    }, [length]);

    return (
      <IndicatorWrapper>
        {range.map((_, index) => {
          return (
            <Indicator className={index === selectedIndex ? "selected" : ""} />
          );
        })}
      </IndicatorWrapper>
    );
  },
  (prev, next) =>
    prev.selectedIndex === next.selectedIndex && prev.length === next.length
);

const IndicatorWrapper = styled.div`
  display: flex;

  & :not(:last-child) {
    margin-right: 15px;
  }
`;

const Indicator = styled.div`
  width: 9px;
  height: 9px;

  border-radius: 4.5px;

  background: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.3;

  transition: width ease 0.3s;
  will-change: width, opacity;

  &.selected {
    width: 30px;

    opacity: 1;
  }
`;
