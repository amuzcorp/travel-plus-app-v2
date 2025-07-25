import React, { useCallback } from "react";
import styled from "styled-components";

import { $L } from "@enact/i18n/$L";

import Icon from "../../../../assets/icons/IGoToTopIcon";
import { rem } from "../../../utils/rem";
import BaseAccessibleComponent from "../../BaseAccessibleComponent";
import { RoundButtonBase } from "../RoundButton/RoundButton";

interface ScrollToTopButtonProps {
  type?: "small" | "large";
  onClick?: () => void;
  [key: string]: any;
}

const ScrollToTopButton = ({
  type = "large",
  onClick = () => {},
  ...rest
}: ScrollToTopButtonProps) => {
  const isSmall = type === "small";

  const onClickHandler = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      onClick();
    },
    [onClick]
  );

  return (
    <BaseAccessibleComponent
      component={(props) => <StyledRoundButton {...props} $isSmall={isSmall} />}
      onClick={onClickHandler}
      speaker={$L("common.goToTop") + " " + $L("common.button")}
      {...rest}
    >
      <Icon />
    </BaseAccessibleComponent>
  );
};

export default React.memo(ScrollToTopButton);

interface StyledRoundButtonProps {
  $isSmall: boolean;
}

const StyledRoundButton = styled(RoundButtonBase)<StyledRoundButtonProps>`
  min-width: ${rem(150)};
  height: ${rem(39)};

  ${({ $isSmall }) =>
    $isSmall &&
    `
      padding: ${rem(16.5)};
      min-width: ${rem(39)};
    `};

  > svg {
    position: absolute;
  }

  &:focus path {
    stroke: ${({ theme }) => theme.colors.text.primaryVari};
  }
`;
