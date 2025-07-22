import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/core/store/store";
import Button from "@enact/sandstone/Button";

import css from "./CmdButton.module.less";

interface CmdButtonProps {
  index?: number;
  useFocus?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const CmdButton: React.FC<CmdButtonProps> = ({
  index = -1,
  useFocus = true,
  onClick = () => {},
  children,
}) => {
  const selectedIndex = useSelector(
    (state: RootState) => state.gnb.selectedIndex
  );

  const buttonProps = {
    size: "small" as const,
    selected: index === selectedIndex,
    spotlightDisabled: !useFocus,
    onClick: onClick,
    css: css,
    roundBorder: true,
  };

  return <Button {...buttonProps}>{children}</Button>;
};

export default CmdButton;
