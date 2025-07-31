import React, { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import IDestinationNext from "../../assets/icons/IDestinationNext";
import IconButton from "../Buttons/IconButtons/IconButton";
import Spacing from "../Spacing/Spacing";
import MarqueeText from "../Texts/MarqueeText";
import Text from "../Texts/Text";

interface HeaderProps {
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  stepList?: Array<string>;
  activeStepIndex?: number;
  rightButtons?: React.ReactNode[];
}

const Header: React.FC<HeaderProps> = React.memo(
  ({
    onBack,
    title = "",
    subtitle = "",
    stepList = [],
    activeStepIndex = 0,
    rightButtons = [],
  }) => {
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

    const renderSubsection = () => {
      const hasSubtitle = !!subtitle;
      const hasSteps = stepList.length > 0;

      if (hasSubtitle && hasSteps) {
        return (
          <SubtitleWrapper>
            <Text textStyle="titleMdRg" color={theme.colors.text.secondary}>
              {subtitle}
            </Text>
            <StepListWrapper>
              {stepList.map((step, index) => (
                <React.Fragment key={step}>
                  <SubTitleList $active={index === activeStepIndex}>
                    {step}
                  </SubTitleList>
                  {index < stepList.length - 1 && <IDestinationNext />}
                </React.Fragment>
              ))}
            </StepListWrapper>
          </SubtitleWrapper>
        );
      }

      if (hasSubtitle) {
        return (
          <Text textStyle="titleMdRg" color={theme.colors.text.secondary}>
            {subtitle}
          </Text>
        );
      }

      if (hasSteps) {
        return (
          <StepListWrapper>
            {stepList.map((step, index) => (
              <React.Fragment key={step}>
                <SubTitleList $active={index === activeStepIndex}>
                  {step}
                </SubTitleList>
                {index < stepList.length - 1 && <IDestinationNext />}
              </React.Fragment>
            ))}
          </StepListWrapper>
        );
      }

      return null;
    };

    return (
      <HeaderContainer>
        <Left>
          {backElement}
          <TitleGroup>
            <MarqueeText textStyle="headerXlSb">{title}</MarqueeText>
            <Spacing size={9} />
            {renderSubsection()}
          </TitleGroup>
        </Left>
        <Right>{rightButtonElements}</Right>
      </HeaderContainer>
    );
  }
);

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 107px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  padding: 54px 72px 37px 72px;
  z-index: ${({ theme }) => `${theme.zIndex.header}`};
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
`;

const BackWrapper = styled.div`
  width: 93px;
  height: 93px;
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

const SubtitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StepListWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const SubTitleList = styled.li<{ $active?: boolean }>`
  list-style: none;
  font-size: ${({ theme }) => `${theme.textStyle.titleSmRg.fontSize}`};
  font-family: "LGSmartUI";
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ theme }) => `${theme.colors.text.primary}`};
  opacity: ${({ $active }) => ($active ? "1" : "0.7")};
`;

const Right = styled.div`
  display: flex;
  padding-left: 32px;
`;

const RightButton = styled.div<{ isFirst: boolean }>`
  display: flex;
  ${(props) => !props.isFirst && `margin-left: 33px;`}
`;
