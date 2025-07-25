import React from "react";
import styled from "styled-components";

import Marquee from "@enact/ui/Marquee";
import { rem } from "../../../utils/rem";
import BaseAccessibleComponent from "../../BaseAccessibleComponent";

interface RectangleButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  speaker?: string;
  [key: string]: any;
}

const RectangleButton = ({
  disabled = false,
  onClick = () => {},
  children,
  speaker,
  className,
  ...rest
}: RectangleButtonProps) => {
  const onClickHandler = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) return;
    onClick();
  };

  const mergedClassName = [className, disabled ? "dimmed" : ""].filter(Boolean).join(" ");

  return (
    <BaseAccessibleComponent
      component={RectangleButtonBase}
      className={mergedClassName}
      onClick={onClickHandler}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          onClickHandler(e);
        }
      }}
      speaker={speaker}
      disabled={disabled}
      {...rest}
    >
      {children}
    </BaseAccessibleComponent>
  );
};

export default React.memo(RectangleButton);

export const RectangleButtonBase = styled(Marquee)`
  position: relative;

  width: ${rem(240)};
  padding: ${rem(18.5)} ${rem(40)};

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: "LGSmartUI";
  font-size: ${({ theme }) => theme.textStyle.titleMdSb.fontSize};
  font-weight: ${({ theme }) => theme.textStyle.titleMdSb.fontWeight};

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
    box-shadow: inset 0 0 0 ${rem(2)} ${({ theme }) => theme.colors.deactive.normal};
    border-radius: ${rem(12)};

    transition: transform ease 0.3s;
    will-change: transition;
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
