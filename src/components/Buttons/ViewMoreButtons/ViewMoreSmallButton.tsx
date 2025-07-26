import Marquee from "@enact/ui/Marquee";
import React from "react";
import styled from "styled-components";
import BaseAccessibleComponent from "../../../components/BaseAccessibleComponent";
import Spacing from "../../../components/Spacing/Spacing";
import { rem } from "../../../utils/rem";
import { translate } from "../../../utils/translate";

export default React.memo(() => {
  return (
    <BaseAccessibleComponent component={Button}>
      <TextWrapper>
        <p>{translate("More")}</p>
        <Spacing size={4} direction="horizontal" />
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="#E6E6E6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="icn_plus">
            <path
              id="shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.88424 7.1155V1.53857H7.11501V7.1155H1.53809V7.88473H7.11501V13.4617H7.88424V7.88473H13.4612V7.1155H7.88424Z"
              stroke="#E6E6E6"
            />
          </g>
        </svg>
      </TextWrapper>
    </BaseAccessibleComponent>
  );
});

const Button = styled(Marquee)`
  all: unset;

  position: relative;

  width: fit-content;

  padding: ${rem(6)} ${rem(12)};
  padding-left: ${rem(14)};

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: "LGSmartUI";
  font-size: ${({ theme }) => theme.textStyle.bodyTinySb.fontSize};
  font-weight: ${({ theme }) => theme.textStyle.bodyTinySb.fontWeight};
  line-height: normal;
  vertical-align: center;

  cursor: pointer;

  display: flex;
  justify-content: center;

  &::before {
    position: absolute;
    top: 0;
    left: 0;

    display: block;
    content: "";

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.4);
    border-radius: ${rem(8)};
    box-shadow: ${({ theme }) =>
      ` inset 0 0 0 ${rem(1)} ${theme.colors.deactive.normal}`};

    transition: transform ease 0.3s;
    will-change: transform background box-shadow;

    pointer-events: none;
  }

  &:focus::before {
    background: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 0 ${rem(14)} ${rem(30)} 0 rgba(0, 0, 0, 0.3);
    transform: scale(1.05);

    pointer-events: none;
  }

  &:focus {
    color: ${({ theme }) => theme.colors.text.primaryVari};

    & svg {
      fill: ${({ theme }) => theme.colors.text.primaryVari};

      & path {
        stroke: ${({ theme }) => theme.colors.text.primaryVari};
      }
    }
  }
`;

const TextWrapper = styled.span`
  display: flex;
  align-items: center;
`;
