import styled from "styled-components";

const ButtonBase = styled.button`
  all: unset;

  transition: transform ease 0.3s;
  will-change: transition;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "LGSmartUI";
  font-size: ${({ theme }) => theme.textStyle.headerSmSb.fontSize};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  vertical-align: center;

  &:focus {
    transform: scale(1.1);
  }
`;

export default ButtonBase;
