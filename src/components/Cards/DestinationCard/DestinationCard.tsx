import Marquee from "@enact/ui/Marquee";
import React from "react";
import styled from "styled-components";

import BaseAccessibleComponent from "../../../components/BaseAccessibleComponent";
import {
  continentCardHeight,
  destinationCardWidth,
} from "../../../constants/globalConstant";

export class DestinationCardData {
  constructor({ title, background }: { title: string; background: string }) {
    this.title = title;
    this.background = background;
  }

  title: string;
  background: string;
}

export interface CountryCardProps {
  id: any;
  key: any;
  data: DestinationCardData;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
}

export default React.memo(
  ({ id, key, data, onKeyDown, onKeyUp, ...rest }: CountryCardProps) => {
    return (
      <BaseAccessibleComponent
        id={id}
        key={key}
        component={DestinationCardWrapper}
        $cardWidth={destinationCardWidth}
        $cardHeight={continentCardHeight}
        $background={data.background}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        {...rest}
      >
        <LabelWrapper>{data.title}</LabelWrapper>
      </BaseAccessibleComponent>
    );
  },
  (prev, next) => true
);

const DestinationCardWrapper = styled.div<{
  $cardWidth: number;
  $cardHeight: number;
  $background: string;
}>`
  position: relative;

  width: ${({ $cardWidth }) => $cardWidth}px;
  height: ${({ $cardHeight }) => $cardHeight}px;

  background: ${({ $background }) => $background};

  transition: transform ease 0.3s, opacity ease 0.3s;

  border-radius: 12px;

  &::after {
    display: block;
    content: "";

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    box-shadow: ${({ theme }) =>
      `inset 0 0 0 1px ${theme.colors.deactive.normal}`};

    border-radius: 12px;
  }

  &:focus {
    transform: scale(1.1);

    outline: 3px solid ${({ theme }) => theme.colors.text.primary};
  }

  &.hided {
    opacity: 0.2;
  }
`;

const LabelWrapper = styled(Marquee)`
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;

  display: flex;
  justify-content: center;

  font-family: "LGSmartUI";
  font-size: ${({ theme }) => theme.textStyle.titleSmSb.fontSize};
  font-weight: ${({ theme }) => theme.textStyle.titleSmSb.fontWeight};

  background: gray;
`;
