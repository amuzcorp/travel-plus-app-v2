import Spottable from "@enact/spotlight/Spottable";
import React from "react";
import styled from "styled-components";

const RoundButton = React.memo(({ ...rest }) => {
  return <StyledButton {...rest}>HELLO WORLD</StyledButton>;
});

export default Spottable(RoundButton);

const StyledButton = styled.button`
  font-size: 2rem;
  background: yellow;

  &:focus {
    background: orange;
  }
`;
