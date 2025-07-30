import styled from "styled-components";

interface SpacingProps {
  size?: number;
  direction?: "horizontal" | "vertical"; // 기본: vertical
}

const Spacer = styled.div<Required<SpacingProps>>`
  ${({ direction, size }) =>
    direction === "vertical" ? `height: ${size}px;` : `width: ${size}px;`}
  flex-shrink: 0;
`;

const Spacing = ({ size = 16, direction = "vertical" }: SpacingProps) => {
  return <Spacer size={size} direction={direction} />;
};

export default Spacing;
