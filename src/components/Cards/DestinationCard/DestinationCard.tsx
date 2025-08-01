import Marquee from "@enact/ui/Marquee";
import React from "react";
import styled from "styled-components";
import BaseAccessibleComponent from "../../../components/BaseAccessibleComponent";
import BlurEffect from "./DestinationBlurEffect";

export class DestinationCardData {
  constructor({ title, image }: { title: string; image: string }) {
    this.title = title;
    this.image = image;
  }
  title: string;
  image: string;
}

export interface DestinationCardProps {
  id: any;
  key: any;
  data: DestinationCardData;
  type?: "continent" | "country" | "city";
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  onKeyUp?: (ev: React.KeyboardEvent) => void;
}

export default React.memo(
  ({
    id,
    key,
    data,
    type = "continent",
    onKeyDown,
    onKeyUp,
    ...rest
  }: DestinationCardProps) => {
    const cardHeight = type === "continent" ? 96 : 130;
    const cardWidth = 390;

    return (
      <BaseAccessibleComponent
        id={id}
        key={key}
        component={DestinationCardWrapper}
        $cardWidth={cardWidth}
        $cardHeight={cardHeight}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        {...rest}
      >
        <BlurEffect image={data.image} active={true} />
        <ContentWrapper>
          <TitleWrapper marqueeOn="focus">{data.title}</TitleWrapper>
        </ContentWrapper>
      </BaseAccessibleComponent>
    );
  },
  (prev, next) => prev.data === next.data && prev.type === next.type
);

const DestinationCardWrapper = styled.div<{
  $cardWidth: number;
  $cardHeight: number;
}>`
  position: relative;
  flex-shrink: 0;

  width: ${({ $cardWidth }) => $cardWidth}px;
  height: ${({ $cardHeight }) => $cardHeight}px;

  margin-bottom: 24px;
  border-radius: 12px;

  transition: transform 0.3s ease;
  will-change: transform;

  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    box-shadow: ${({ theme }) =>
      `inset 0 0 0 1px ${theme.colors.deactive.normal}`};
    pointer-events: none;
  }

  &:focus {
    transform-origin: top left;
    transform: scale(1.1);
    z-index: 5;
    outline: 3px solid #e6e6e6;

    &::after {
      box-shadow: none;
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: #e6e6e6;
`;

const TitleWrapper = styled(Marquee)`
  width: 100%;
  height: 39px;
  line-height: normal;
  font-size: 33px;
  font-weight: 600;
  font-family: "LGSmartUI";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
`;
