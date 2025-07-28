import React, { useMemo } from "react";
import styled from "styled-components";

interface ProfileIconProps {
  text?: string;
  bgColor?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = React.memo(
  ({ text = "", bgColor = "rgba(191, 70, 88, 1)" }) => {
    const style = useMemo(() => ({ backgroundColor: bgColor }), [bgColor]);

    return <Circle style={style}>{text}</Circle>;
  }
);

export default ProfileIcon;

const Circle = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 39px;
  height: 39px;

  color: white;
  font-family: "LGSmartUI";
  font-size: 27px;
  font-weight: 600;
  text-align: center;
`;
