import styled from "styled-components";

const ButtonBase = styled.button`
  all: unset;

  transition: transform ease 0.3s;
  will-change: transition;

  display: flex;
  justify-content: center;
  align-items: center;

  vertical-align: center;

  &:focus {
    transform: scale(1.05);
  }
`;

export default ButtonBase;
