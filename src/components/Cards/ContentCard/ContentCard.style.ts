import Marquee from "@enact/ui/Marquee";
import styled from "styled-components";

export const ContentCardWrapper = styled.div<{ $width?: number }>`
  width: ${({ $width }) => $width ?? 0}px;
  height: auto;

  transition: transform ease 0.3s, opacity ease 0.3s;
  will-change: transform, opacity;

  opacity: 1;

  &:focus {
    transform: scale(1.1);

    .image-wrapper {
      outline: solid 3px ${({ theme }) => theme.colors.text.primary};

      &::after {
        box-shadow: none;
      }
    }
  }

  &.hided {
    opacity: 0.2;
  }
`;

export const ImageWrapper = styled.div<{ $width?: number; $height?: number }>`
  position: relative;

  width: ${({ $width }) => $width ?? 0}px;
  height: ${({ $height }) => $height ?? 0}px;

  border-radius: 12px;

  margin-bottom: 16px;
  background: yellow;

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
`;

export const BackgroundImage = styled.img<{
  $width?: number;
  $height?: number;
}>`
  position: absolute;
  top: 0px;
  left: 0px;

  width: ${({ $width }) => $width ?? 0}px;
  height: ${({ $height }) => $height ?? 0}px;

  border-radius: 12px;
  overflow: hidden;

  object-fit: cover;
`;

export const BadgeWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const FeatureWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  & > :not(:last-child) {
    margin-right: 6px;
  }
`;

export const TitleWrapper = styled(Marquee)`
  width: 100%;
  height: auto;

  margin-bottom: 4px;

  font-size: ${({ theme }) => theme.textStyle.titleSmSb.fontSize};
  font-weight: 600;
  font-family: "LGSmartUI";
`;

export const DescriptionWrapper = styled.div`
  width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: ${({ theme }) => theme.textStyle.titleTinyRg.fontSize};
  font-weight: ${({ theme }) => theme.textStyle.titleTinyRg.fontWeight};
  font-family: "LGSmartUI";
  color: ${({ theme }) => theme.colors.text.primary};

  opacity: 0.7;
`;

export const DateWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > svg {
    margin: 0 6px;
    vertical-align: middle;
  }

  /* & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    flex-shrink: 1;
    flex-grow: 0;
    flex-basis: auto;
    min-width: 0;
  } */
`;
