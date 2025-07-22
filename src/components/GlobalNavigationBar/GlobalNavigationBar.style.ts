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

  width: ${({ $expanded }) =>
    $expanded ? "calc(350 / 24 * 1rem)" : "calc(80 / 24 * 1rem)"};
  height: calc(100vh - 100 / 24 * 1rem);

  margin: calc(20 / 24 * 1rem) 0;
  padding: calc(30 / 24 * 1rem) calc(25.5 / 25 * 1rem);

  border-top-right-radius: calc(12 / 24 * 1rem);
  border-bottom-right-radius: calc(12 / 24 * 1rem);

  background: ${({ $expanded }) => ($expanded ? "rgba(0,0,0,0.3)" : "none")};
  backdrop-filter: ${({ $expanded }) => ($expanded ? "blur(25px)" : "none")};

  z-index: ${({ theme }) => theme.zIndex.gnb};

  transition: width ease 0.2s;
  will-change: width;

  box-shadow: inset 0 1px 0 0
      ${({ theme, $expanded }) =>
        $expanded ? theme.colors.text.primaryVari : "transparent"},
    inset -1px 0 0 0 ${({ theme, $expanded }) => ($expanded ? theme.colors.text.primaryVari : "transparent")},
    inset 0 -1px 0 0 ${({ theme, $expanded }) => ($expanded ? theme.colors.text.primaryVari : "transparent")};
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
