import React from "react";
import styled from "styled-components";
import { RoundButtonBase } from "../../RoundButton/RoundButton";

interface CircularButtonProps {
  type: "small" | "large";
  onClick: Function;
}

export default React.memo(({}: CircularButtonProps) => {
  return <div></div>;
});

export const CircularButtonBase = styled(RoundButtonBase)``;
