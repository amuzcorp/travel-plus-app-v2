import Button from "@enact/sandstone/Button";
import PropTypes from "prop-types";
import styled from "styled-components";

const GlobalNavigationBarButton = ({
  icon,
  useFocus = true,
  onClick = () => {},
}) => {
  const buttonProps = {
    icon: icon,
    size: "small",
    $useFocus: useFocus,
    spotlightDisabled: !useFocus,
    onClick: onClick,
  };

  return <StyledButton {...buttonProps} />;
};

export default GlobalNavigationBarButton;

GlobalNavigationBarButton.propTypes = {
  icon: PropTypes.string.isRequired,
  useFocus: PropTypes.bool,
  onClick: PropTypes.func,
};

const StyledButton = styled(Button)`
  pointer-events: ${({ $useFocus }) => ($useFocus ? "auto" : "none")};
`;
