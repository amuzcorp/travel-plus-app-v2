import React from "react";
import styled from "styled-components";

import RoundButton from "../../../../components/Buttons/RoundButton/RoundButton";
import Spacing from "../../../../components/Spacing/Spacing";
import Text from "../../../../components/Texts/Text";
import { translate } from "../../../../utils/translate";
import { SectionWrapper } from "../CityRow/CityRow.style";

export default React.memo(() => {
  return (
    <SectionWrapper $marginLeft={180}>
      <Text textStyle="titleMdSb">{translate("travel.travelDeals")}</Text>
      <Spacing size={24} />
      <ImageWrapper>
        <ButtonWrapper>
          <RoundButton>Watch Video</RoundButton>
          <RoundButton>Discover Now</RoundButton>
        </ButtonWrapper>
      </ImageWrapper>
    </SectionWrapper>
  );
});

const ImageWrapper = styled.div`
  position: relative;

  width: calc(100% - 56px);
  height: 700px;

  margin-right: 56px;

  background: orange;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 70px;
  bottom: 118px;

  display: flex;

  & > :not(:last-child) {
    margin-right: 24px;
  }
`;
