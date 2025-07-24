import Spottable from "@enact/spotlight/Spottable";
import React from "react";
import styled from "styled-components";
import { RoundButtonBase } from "../RoundButton/RoundButton";
import AnnounceDecorator from "@enact/ui/AnnounceDecorator";

import Icon from "../../../../assets/icons/IGoToTopIcon";

const ScrollToTopButton = React.memo(
  ({ type = "large", onClick = () => {}, announce, ...rest }: any) => {
    return (
      <StyledRoundButton
        marqueeDisabled
        $isSmall={type === "small"}
        onClick={onClick}
        {...rest}
      >
        <Icon />
      </StyledRoundButton>
    );
  }
);

export default AnnounceDecorator(Spottable(ScrollToTopButton));

interface StyledRoundButtonProps {
  $isSmall: boolean;
}

const StyledRoundButton = styled(RoundButtonBase)<StyledRoundButtonProps>`
  min-width: calc(150 / 24 * 1rem);
  height: calc(39 / 24 * 1rem);

  ${({ $isSmall }) =>
    $isSmall &&
    `
    padding: calc(16.5 / 24 * 1rem);
    min-width: calc(39 / 24 * 1rem);;
  `};

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: calc(39 / 24 * 1rem);
  line-height: 1;

  svg {
    position: absolute;
  }

  &:focus path {
    stroke: ${({ theme }) => theme.colors.text.primaryVari};
  }
`;
