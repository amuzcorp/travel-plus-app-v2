import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import IBack from "../../../../assets/icons/IBack";
import IOption from "../../../../assets/icons/IOption";

import { rem } from "../../../utils/rem";
import { translate } from "../../../utils/translate";
import BaseAccessibleComponent from "../../BaseAccessibleComponent";

interface IconButtonProps {
  spotlightId?: string;
  disabled?: boolean;
  onClick?: () => void;
  speaker?: string;
  isLarge?: boolean;
  type?: "back" | "option" | "delete" | "info" | "caption" | "luggage";
  className?: string;
  [key: string]: any;
}

// 필요한 아이콘 리소스 추가하면 됨
const iconMap = {
  back: IBack,
  option: IOption,
  delete: IBack,
  info: IBack,
  caption: IBack,
  luggage: IBack,
} as const;

const IconButton = ({
  disabled = false,
  onClick = () => {},
  speaker = translate(["common.back", "common.button"]),
  className,
  isLarge = false,
  type = "back",
  spotlightId,
  ...rest
}: IconButtonProps) => {
  const onClickHandler = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if (!disabled) onClick();
    },
    [disabled, onClick]
  );

  const mergedClassName = useMemo(
    () => [className, disabled ? "dimmed" : ""].filter(Boolean).join(" "),
    [className, disabled]
  );

  const IconComponent = useMemo(() => iconMap[type] || IBack, [type]);
  const iconSize = isLarge ? "54" : "39";

  const getComponent = useCallback(
    (props: IconButtonProps) => (
      <IconButtonBase {...props} $isLarge={isLarge} />
    ),
    [isLarge]
  );

  return (
    <BaseAccessibleComponent
      component={getComponent}
      className={mergedClassName}
      onClick={onClickHandler}
      spotlightId={spotlightId}
      speaker={speaker}
      disabled={disabled}
      {...rest}
    >
      <IconComponent width={iconSize} height={iconSize} />
    </BaseAccessibleComponent>
  );
};

export default React.memo(IconButton);

export const IconButtonBase = styled.div<{ $isLarge?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: fit-content;

  padding: ${({ $isLarge }) => ($isLarge ? rem(13.5) : rem(12))};
  border-radius: ${rem(12)};
  z-index: 1;
  color: ${({ theme }) => theme.colors.text.primary};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background.black};
    border-radius: ${rem(12)};
    transition: transform 0.3s ease, background-color 0.3s ease;
    z-index: -1;
  }

  &:focus::before {
    background-color: #fff;
    transform: scale(1.05);
  }

  &:focus {
    color: ${({ theme }) => theme.colors.text.primaryVari};

    svg path {
      fill: ${({ theme }) => theme.colors.text.primaryVari};
    }
  }

  &.dimmed {
    opacity: 0.4;
  }
`;
