import { Cell } from "@enact/ui/Layout";
import styled from "styled-components";

export const GNBWrapper = styled(Cell)`
  position: fixed !important;
  left: 0;

  width: ${({ theme, $expanded }) =>
    $expanded ? `${theme.size.gnbExpanded}px` : `${theme.size.gnbCollapsed}px`};
  // 100vh - (padding + margin)
  height: calc(100vh - 100px);

  margin: 20px 0;
  padding: 30px 0;

  background: orange;

  z-index: ${({ theme }) => theme.zIndex.gnb};

  transition: width ease 0.2s;
  will-change: width;
`;
