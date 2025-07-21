import styled from "styled-components";

interface GNBWrapperProps {
  $expanded: boolean;
}

interface GNBOverlayProps {
  $expanded: boolean;
}

export const GNBWrapper = styled.div<GNBWrapperProps>`
  position: fixed;
  left: 0;
  width: 130px;
  /* width: ${({ theme, $expanded }) =>
    $expanded
      ? `${theme.size.gnbExpanded}px`
      : `${theme.size.gnbCollapsed}px`}; */
  // 100vh - (padding + margin)
  height: calc(100vh - 100px);

  margin: 20px 0;
  padding: 30px 25.5px;

  background: orange;

  z-index: ${({ theme }) => theme.zIndex.gnb};

  /* transition: width ease 0.2s;
  will-change: width; */
`;

export const GNBOverlay = styled.div<GNBOverlayProps>`
  position: fixed;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.7);

  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};

  z-index: ${({ theme }) => theme.zIndex.gnb};

  display: ${({ $expanded }) => ($expanded ? "" : "none")};

  transition: opacity ease 0.2s;
  will-change: opacity;
`;
