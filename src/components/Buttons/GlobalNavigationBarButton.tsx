import React from "react";
import Button from "@enact/sandstone/Button";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../core/store/store";

interface GlobalNavigationBarButtonProps {
  icon: string;
  index?: number;
  useFocus?: boolean;
  onClick?: () => void;
}

const GlobalNavigationBarButton: React.FC<GlobalNavigationBarButtonProps> = ({
  icon,
  index,
  useFocus = true,
  onClick = () => {},
}) => {
  const selectedIndex = useSelector((state: RootState) => state.gnb.selectedIndex);

  const buttonProps = {
    icon: icon,
    size: "small" as const,
    selected: index === selectedIndex,
    $useFocus: useFocus,
    spotlightDisabled: !useFocus,
    onClick: onClick,
  };

  return <StyledButton {...buttonProps} />;
};

export default GlobalNavigationBarButton;

const StyledButton = styled(Button)<{ $useFocus?: boolean }>`
  pointer-events: ${({ $useFocus }) => ($useFocus ? "auto" : "none")};
`;