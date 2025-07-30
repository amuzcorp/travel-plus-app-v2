import React, { useCallback } from "react";
import styled, { css } from "styled-components";

import Marquee from "@enact/ui/Marquee";
import BaseAccessibleComponent from "../../BaseAccessibleComponent";

interface RoundButtonProps {
  spotlightId?: string;
  disabled?: boolean;
  onClick?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent<any>) => void;
  children: React.ReactNode;
  speaker?: string;
  className?: string;
  isSmall?: boolean;
  [key: string]: any;
}

const RoundButton = ({
  spotlightId,
  disabled = false,
  onClick = () => {},
  onKeyDown = (ev) => {},
  children,
  speaker,
  className,
  isSmall = false, // 기본값: large
  ...rest
}: RoundButtonProps) => {
  const onClickHandler = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled) return;
      onClick();
    },
    [disabled, onClick]
  );

  const mergedClassName = [className, disabled ? "dimmed" : ""]
    .filter(Boolean)
    .join(" ");

  const getComponent = useCallback(
    (props: RoundButtonProps) => {
      return <RoundButtonBase {...props} $isSmall={isSmall} />;
    },
    [isSmall]
  );

  return (
    <BaseAccessibleComponent
      spotlightId={spotlightId}
      component={getComponent}
      className={mergedClassName}
      onClick={onClickHandler}
      onKeyDown={onKeyDown}
      speaker={speaker}
      disabled={disabled}
      {...rest}
    >
      {children}
    </BaseAccessibleComponent>
  );
};

export default React.memo(RoundButton);

export const RoundButtonBase = styled(Marquee)<{ $isSmall?: boolean }>`
  position: relative;

  width: fit-content;
  min-width: 160px;
  max-width: 20vw;

  padding: 16.5px 55px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: "LGSmartUI";
  font-size: ${({ theme }) => theme.textStyle.headerSmSb.fontSize};
  font-weight: 600;
  line-height: normal;
  vertical-align: center;

  cursor: pointer;

  display: flex;
  justify-content: center;

  ${({ $isSmall, theme }) =>
    $isSmall &&
    css`
      min-width: 98px;
      font-size: ${theme.textStyle.titleMdSb.fontSize};
    `}

  &::before {
    position: absolute;
    top: 0;
    left: 0;

    display: block;
    content: "";

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.4);
    box-shadow: ${({ theme }) =>
      `inset 0 0 0 2px ${theme.colors.deactive.normal}`};

    border-radius: 1000px;

    transition: transform ease 0.3s;
    will-change: transition;

    pointer-events: none;
  }

  &:focus::before {
    background: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 0 14px 30px 0 rgba(0, 0, 0, 0.3);
    transform: scale(1.05);

    pointer-events: none;
  }

  &:focus {
    color: ${({ theme }) => theme.colors.text.primaryVari};
  }

  &.dimmed {
    opacity: 0.4;
  }
`;
