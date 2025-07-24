import styled from "styled-components";

export interface GlobalNavigationChildProps {
  $marginBottom?: number;
}
export const GlobalNavigationChild = styled.button<GlobalNavigationChildProps>`
  all: unset;

  width: calc(100% - 13 / 24 * 1rem);
  height: calc(79 / 24 * 1rem);

  padding: 0 calc(6.5 / 24 * 1rem);
  ${({ $marginBottom }) =>
    $marginBottom &&
    `
    margin-bottom: calc(${$marginBottom} / 24 * 1rem);
  `};

  display: flex;
  justify-content: start;
  align-items: center;

  border-radius: calc(12 / 24 * 1rem);

  overflow: hidden;

  cursor: pointer;

  &:focus {
    background: ${({ theme }) => theme.colors.text.primary};
    color: ${({ theme }) => theme.colors.text.primaryVari};

    .icon {
      path {
        fill: ${({ theme }) => theme.colors.text.primaryVari};
      }

      .idle {
        opacity: 0;
      }
      .focused {
        opacity: 1;
      }
    }

    .label {
      color: ${({ theme }) => theme.colors.text.primaryVari};
    }
  }

  &.selected {
    color: ${({ theme }) => theme.colors.keyColor.item};

    .icon {
      background: rgba(0, 255, 204, 0.14);
      box-shadow: inset 0 0 0 calc(1 / 24 * 1rem) rgba(0, 255, 204, 0.12);

      path {
        fill: ${({ theme }) => theme.colors.text.primary};
      }

      .idle {
        opacity: 0;
      }
      .focused {
        opacity: 1;
      }
    }

    .label {
      color: ${({ theme }) => theme.colors.keyColor.item};
    }
  }

  &.selected.expanded {
    .icon {
      path {
        fill: ${({ theme }) => theme.colors.keyColor.item};
      }
    }
  }

  &.expanded {
    .label {
      display: block;
    }

    .icon {
      background: none;
      box-shadow: none;
    }
  }
`;

export const GlobalNavigationChildIcon = styled.div`
  position: relative;

  width: calc(66 / 24 * 1rem);
  height: calc(66 / 24 * 1rem);

  border-radius: 0.5rem;

  flex: 0 0 auto;
`;

export const GlobalNavigationChildLabel = styled.span`
  display: none;

  margin-left: calc(10 / 24 * 1rem);

  flex-grow: 1;

  font-family: "LGSmartUI";
  font-weight: 600;
  color: rgba(230, 230, 230, 0.8);

  white-space: nowrap;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  &.focused {
    opacity: 0;
  }
`;
