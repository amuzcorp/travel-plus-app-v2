import React, { useCallback } from "react";
import styled from "styled-components";

import Icon from "../../../../assets/icons/IGoToTopIcon";
import { translate } from "../../../utils/translate";
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
      speaker={translate(["common.goToTop", "common.button"])}
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
  min-width: 150px;
  height: 39px
    ${({ $isSmall }) =>
      $isSmall &&
      `
      padding: 16.5px;
      min-width: 39px;
    `};

  > svg {
    position: absolute;
  }

  &:focus path {
    stroke: ${({ theme }) => theme.colors.text.primaryVari};
  }
`;
