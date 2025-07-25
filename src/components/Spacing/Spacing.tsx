import styled from "styled-components";
import { rem } from "../../utils/rem";

interface SpacingProps {
  size?: number;
  direction?: "horizontal" | "vertical"; // 기본: vertical
}

const Spacer = styled.div<Required<SpacingProps>>`
  ${({ direction, size }) =>
    direction === "vertical" ? `height: ${rem(size)};` : `width: ${rem(size)};`}
  flex-shrink: 0;
`;

const Spacing = ({ size = 16, direction = "vertical" }: SpacingProps) => {
  return <Spacer size={size} direction={direction} />;
};

export default Spacing;
