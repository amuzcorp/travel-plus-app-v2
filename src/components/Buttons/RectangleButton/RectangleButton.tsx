import React, { useCallback } from "react";
import styled, { css } from "styled-components";

import Marquee from "@enact/ui/Marquee";
import { rem } from "../../../utils/rem";
import BaseAccessibleComponent from "../../BaseAccessibleComponent";

interface RectangleButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  speaker?: string;
  isLarge?: boolean;
  [key: string]: any;
}

const RectangleButton = ({
  disabled = false,
  onClick = () => {},
  children,
  speaker,
  className,
  isLarge = false, // 기본값: small 상태
  ...rest
}: RectangleButtonProps) => {
  const onClickHandler = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled) return;
      onClick();
    },
    [disabled, onClick]
  );

  const mergedClassName = [className, disabled ? "dimmed" : ""].filter(Boolean).join(" ");

  return (
    <BaseAccessibleComponent
      component={(props) => <RectangleButtonBase {...props} $isLarge={isLarge} />}
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

export default React.memo(RectangleButton);

// ✅ $isLarge 기반으로 스타일 조건 분기
export const RectangleButtonBase = styled(Marquee)<{ $isLarge?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;

  color: ${({ theme }) => theme.colors.text.primary};
  font-family: "LGSmartUI";
  font-size: ${({ theme }) => theme.textStyle.titleMdSb.fontSize};
  font-weight: ${({ theme }) => theme.textStyle.titleMdSb.fontWeight};

  cursor: pointer;

  ${({ $isLarge }) =>
    $isLarge
      ? css`
          width: ${rem(240)};
          padding: ${rem(18.5)} ${rem(40)};
        `
      : css`
          width: ${rem(87)};
          padding: ${rem(9.5)} 0;
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
    box-shadow: inset 0 0 0 ${rem(2)} ${({ theme }) => theme.colors.deactive.normal};
    border-radius: ${rem(12)};

    transition: transform ease 0.3s;
    will-change: transform;
  }

  &:focus::before {
    background: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 0 ${rem(14)} ${rem(30)} 0 rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }

  &:focus {
    color: ${({ theme }) => theme.colors.text.primaryVari};
  }

  &.dimmed {
    opacity: 0.4;
  }
`;
