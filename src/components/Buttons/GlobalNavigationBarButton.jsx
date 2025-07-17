import Button from "@enact/sandstone/Button";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

const GlobalNavigationBarButton = ({
  icon,
  index,
  useFocus = true,
  onClick = () => {},
}) => {
  const selectedIndex = useSelector((state) => state.gnb.selectedIndex);

  const buttonProps = {
    icon: icon,
    size: "small",
    selected: index === selectedIndex,
    $useFocus: useFocus,
    spotlightDisabled: !useFocus,
    onClick: onClick,
  };

  return <StyledButton {...buttonProps} />;
};

export default GlobalNavigationBarButton;

GlobalNavigationBarButton.propTypes = {
  icon: PropTypes.string.isRequired,
  index: PropTypes.number,
  useFocus: PropTypes.bool,
  onClick: PropTypes.func,
};

const StyledButton = styled(Button)`
  pointer-events: ${({ $useFocus }) => ($useFocus ? "auto" : "none")};
`;
