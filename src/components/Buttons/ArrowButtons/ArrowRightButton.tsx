import React from "react";
import styled from "styled-components";
import { rem } from "../../../utils/rem";

const ArrowIcon = React.memo(() => {
  return (
    <svg
      width="21"
      height="35"
      viewBox="0 0 21 35"
      fill="#E6E6E6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7797 17.4975L0.000283705 3.17053L2.95054 3.86917e-07L21 17.4969L2.95082 35L-4.174e-06 31.83L14.7797 17.4975Z"
      />
    </svg>
  );
});

interface ArrowRightButtonProps {
  onClick?: () => void;
}

export default React.memo(({ onClick = () => {} }: ArrowRightButtonProps) => {
  return (
    <Button onClick={onClick}>
      <ArrowIcon />
    </Button>
  );
});

const Button = styled.button`
  all: unset;

  width: ${rem(71)};
  height: ${rem(71)};

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateY(-50%);

  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    left: 0;

    display: block;
    content: "";

    width: 100%;
    height: 100%;

    border-radius: 50%;

    transition: transform ease 0.3s;
    will-change: transform background box-shadow;

    pointer-events: none;
  }

  &:hover {
    & svg {
      z-index: 0;
      fill: ${({ theme }) => theme.colors.text.primaryVari};
    }

    &::before {
      background-color: ${({ theme }) => theme.colors.text.primary};
      box-shadow: 0 ${rem(14)} ${rem(30)} 0 rgba(0, 0, 0, 0.3);
      transform: scale(1.05);

      pointer-events: none;
    }
  }
`;
