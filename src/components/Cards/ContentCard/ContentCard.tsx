import React from "react";
import styled from "styled-components";

import Spottable from "@enact/spotlight/Spottable";
import Marquee from "@enact/ui/Marquee";
import BaseAccessibleComponent from "../../../components/BaseAccessibleComponent";
import { contentCardWidth } from "../../../core/constants/globalConstant";

interface ContentCardProps {
  title: string;
  description: string;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
}

export default Spottable(
  React.memo(({ title, description, onKeyDown }: ContentCardProps) => {
    return (
      <BaseAccessibleComponent
        $width={contentCardWidth}
        component={Wrapper}
        onKeyDown={onKeyDown}
      >
        <ImageWrapper className={"image-wrapper"} $width={contentCardWidth} />
        <TitleWrapper>{title}</TitleWrapper>
        <DescriptionWrapper>{description}</DescriptionWrapper>
      </BaseAccessibleComponent>
    );
  })
);

interface WrapperProps {
  $width: number;
}

const Wrapper = styled.div<WrapperProps>`
  width: ${({ $width }) => `${$width}px`};

  height: auto;

  transition: transform ease 0.3s;

  &:focus {
    transform: scale(1.05);

    .image-wrapper {
      outline: solid 3px ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

interface ImageWrapperProps {
  $width: number;
}

const ImageWrapper = styled.div<ImageWrapperProps>`
  width: ${({ $width }) => `calc(${$width} / 24 * 1rem)`};
  aspect-ratio: 16 / 9;

  border-radius: 12px;
  background: indigo;

  margin-bottom: calc(16 / 24 * 1rem);
`;

const TitleWrapper = styled(Marquee)`
  width: 100%;

  margin-bottom: calc(4 / 24 * 1rem);

  font-size: ${({ theme }) => theme.textStyle.titleSmSb.fontSize};
  font-weight: 600;
  font-family: "LGSmartUI";
`;

const DescriptionWrapper = styled.div`
  width: 100%;

  overflow: hidden;

  font-size: ${({ theme }) => theme.textStyle.titleTinySb.fontSize};
  font-family: "LGSmartUI";
  color: ${({ theme }) => theme.colors.text.primary};

  opacity: 0.7;
`;
