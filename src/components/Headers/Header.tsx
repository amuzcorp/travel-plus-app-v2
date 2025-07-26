import React, { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import { rem } from "../../utils/rem";
import IconButton from "../Buttons/IconButtons/IconButton";
import Spacing from "../Spacing/Spacing";
import MarqueeText from "../Texts/MarqueeText";
import Text from "../Texts/Text";

interface HeaderProps {
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  rightButtons?: React.ReactNode[];
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: ${rem(107)};
  background-color: #000;
  display: flex;
  justify-content: space-between;
  padding: ${rem(54)} ${rem(72)} ${rem(37)} ${rem(72)};
  z-index: ${({ theme }) => `${theme.zIndex.header}`};
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
`;

const BackWrapper = styled.div`
  width: ${rem(93)};
  height: ${rem(93)};
  display: flex;
  justify-content: left;
`;

const BackPlaceholder = styled(BackWrapper)`
  visibility: hidden;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${rem(32)};
`;

const RightButton = styled.div<{ isFirst: boolean }>`
  display: flex;
  align-items: center;
  ${(props) => !props.isFirst && `margin-left: ${rem(57)};`}
`;

const Header: React.FC<HeaderProps> = React.memo(
  ({ onBack, title = "", subtitle = "", rightButtons = [] }) => {
    const theme = useTheme();

    const rightButtonElements = useMemo(
      () =>
        rightButtons.map((btn, i) => (
          <RightButton key={i} isFirst={i === 0}>
            {btn}
          </RightButton>
        )),
      [rightButtons]
    );

    const backElement = useMemo(() => {
      return onBack ? (
        <BackWrapper>
          <IconButton onClick={onBack} />
        </BackWrapper>
      ) : (
        <BackPlaceholder />
      );
    }, [onBack]);

    return (
      <HeaderContainer>
        <Left>
          {backElement}
          <TitleGroup>
            <MarqueeText textStyle="headerXlSb">{title}</MarqueeText>
            <Spacing size={9} />
            <Text textStyle="titleMdRg" color={theme.colors.text.secondary}>
              {subtitle}
            </Text>
          </TitleGroup>
        </Left>
        <Right>{rightButtonElements}</Right>
      </HeaderContainer>
    );
  }
);

export default Header;
