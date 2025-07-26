import React, { useCallback } from "react";
import styled, { css } from "styled-components";

import Marquee from "@enact/ui/Marquee";
import { rem } from "../../../utils/rem";
import BaseAccessibleComponent from "../../BaseAccessibleComponent";

interface RoundButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  speaker?: string;
  className?: string;
  isSmall?: boolean;
  [key: string]: any;
}

const RoundButton = ({
  disabled = false,
  onClick = () => {},
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

  const mergedClassName = [className, disabled ? "dimmed" : ""].filter(Boolean).join(" ");

  const getComponent = useCallback(
    (props: RoundButtonProps) => {
      return <RoundButtonBase {...props} $isSmall={isSmall} />;
    },
    [isSmall]
  );

  return (
    <BaseAccessibleComponent
      component={getComponent}
      className={mergedClassName}
      onClick={onClickHandler}
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
  min-width: ${rem(160)};
  max-width: 20vw;

  padding: ${rem(16.5)} ${rem(55)};

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
      min-width: ${rem(98)};
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
      `inset 0 0 0 ${rem(2)} ${theme.colors.deactive.normal}`};

    border-radius: 1000px;

    transition: transform ease 0.3s;
    will-change: transition;

    pointer-events: none;
  }

  &:focus::before {
    background: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 0 ${rem(14)} ${rem(30)} 0 rgba(0, 0, 0, 0.3);
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
