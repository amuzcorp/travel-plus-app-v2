import React from "react";
import styled from "styled-components";
import IVisualGradientDestination from "../../Icons/IVisualGradientDestination";

// 컴포넌트의 props 타입을 정의합니다.
interface BlurEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  active: boolean;
}

const BlurEffect: React.FC<BlurEffectProps> = ({ image, active, ...rest }) => {
  return (
    <BlurCardContainer $active={active} $image={image} {...rest}>
      <IVisualGradientDestination image={image} />
    </BlurCardContainer>
  );
};

export default BlurEffect;

// styled-component가 받는 props의 타입을 명시합니다.
export const BlurCardContainer = styled.div<{
  $image: string;
  $active: boolean;
}>`
  width: 100%;
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 12px;
  pointer-events: none;
  z-index: -1;

  .blur_gradient {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1;
  }
`;
