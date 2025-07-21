import { RootState } from "@/core/store/store";
import Button from "@enact/sandstone/Button";
import { useSelector } from "react-redux";

import style from "./GlobalNavigationBarButton.module.less";

// const style = require("./GlobalNavigationBarButton.module.less");

interface GlobalNavigationBarButtonProps {
  icon: string;
  index?: number;
  useFocus?: boolean;
  onClick?: () => void;
}

const GlobalNavigationBarButton: React.FC<GlobalNavigationBarButtonProps> = ({
  icon,
  index = -1,
  useFocus = true,
  onClick = () => {},
}) => {
  const selectedIndex = useSelector(
    (state: RootState) => state.gnb.selectedIndex
  );

  const buttonProps = {
    icon: icon,
    size: "small" as const,
    selected: index === selectedIndex,
    // $useFocus: useFocus,
    spotlightDisabled: !useFocus,
    onClick: onClick,
    css: style,
  };

  // return <StyledButton {...buttonProps} />;
  return <Button {...buttonProps} />;
};

export default GlobalNavigationBarButton;

// const StyledButton = styled(Button)<{ $useFocus?: boolean }>`
//   pointer-events: ${({ $useFocus }) => ($useFocus ? "auto" : "none")};

//   margin: 0px;
//   padding: 0px;
// `;

// export default kind({
//   name: "GlobalNavigationBarButton",
//   propTypes: {
//     icon: PropTypes.string,
//     index: PropTypes.number,
//     useFocus: PropTypes.bool,
//     onClick: PropTypes.func,
//   },
//   styles: {
//     css,
//     className: "button",
//   },
//   render: ({ icon, index, useFocus, onClick }) => (
//     <Button icon={icon} onClick={onClick} css={css} />
//   ),
// });
