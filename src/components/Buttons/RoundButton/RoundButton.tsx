import Spottable, { SpottableProps } from "@enact/spotlight/Spottable";
import React from "react";
import styled from "styled-components";
import Text from "../../../components/Texts/Text";
import ButtonBase from "../ButtonBase";

interface RoundButtonProps extends SpottableProps {
  children: React.ReactNode;
}

const RoundButton = React.memo(({ children, ...rest }: RoundButtonProps) => {
  return (
    <StyledButton {...rest}>
      <Text textStyle="headerSmSb">{children}</Text>
    </StyledButton>
  );
});

export default Spottable(RoundButton);

const StyledButton = styled(ButtonBase)`
  width: fit-content;
  min-width: calc(160 / 24 * 1rem);
  max-width: auto;

  padding: calc(16.5 / 24 * 1rem) calc(55 / 24 * 1rem);

  background: rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.deactive.normal};
  border-radius: 1000px;

  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    background: ${({ theme }) => theme.colors.text.primary};

    color: ${({ theme }) => theme.colors.text.primaryVari};
  }
`;
