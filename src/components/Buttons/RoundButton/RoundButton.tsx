import Spottable, { SpottableProps } from "@enact/spotlight/Spottable";
import React, { useCallback } from "react";
import styled from "styled-components";
import Marquee from "@enact/ui/Marquee";

interface RoundButtonProps extends SpottableProps {
  children: React.ReactNode;
}

const RoundButton = React.memo(({ children, ...rest }: RoundButtonProps) => {
  return <RoundButtonBase {...rest}>{children}</RoundButtonBase>;
});

const SpottableButton = Spottable(RoundButton);

export default React.memo(
  ({ active = true, onClick = () => {}, children, ...rest }: any) => {
    const onClickHandler = useCallback(() => {
      if (!active) {
        return;
      }

      onClick();
    }, [active, onClick]);

    return (
      <SpottableWrapper
        className={!active ? "dimmed" : ""}
        onClick={onClickHandler}
        {...rest}
      >
        {children}
      </SpottableWrapper>
    );
  }
);

export const RoundButtonBase = styled(Marquee)`
  position: relative;

  width: fit-content;
  min-width: calc(160 / 24 * 1rem);
  max-width: 20vw;

  padding: calc(16.5 / 24 * 1rem) calc(55 / 24 * 1rem);

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: "LGSmartUI";
  font-size: ${({ theme }) => theme.textStyle.headerSmSb.fontSize};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  vertical-align: center;

  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    left: 0;

    display: block;
    content: "";

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.deactive.normal};
    border-radius: 1000px;

    transition: transform ease 0.3s;
    will-change: transition;
  }

  &:focus::before {
    background: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 0px 14px 30px 0px rgba(0, 0, 0, 0.3);

    transform: scale(1.1);
  }

  &:focus {
    color: ${({ theme }) => theme.colors.text.primaryVari};
  }
`;

export const SpottableWrapper = styled(SpottableButton)`
  position: relative;

  &.dimmed::after {
    position: absolute;
    top: 0;
    left: 0;

    display: inline-block;
    content: "";

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.4);

    transition: transform ease 0.3s;
    will-change: transition;
  }

  &:focus.dimmed::after {
    transform: scale(1.1);
  }
`;
