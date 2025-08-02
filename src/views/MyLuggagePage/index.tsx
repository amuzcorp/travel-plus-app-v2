import React, { useEffect } from "react";
import styled from "styled-components";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import { useDispatch } from "react-redux";
import RoundButton from "../../components/Buttons/RoundButton/RoundButton";
import Header from "../../components/Headers/Header";
import Text from "../../components/Texts/Text";
import { useAccount } from "../../hooks/useAccount";
import { setDefaultFocusKey } from "../../store/slices/gnbSlice";
import { translate } from "../../utils/translate";
import LogoutScreen from "./components/LogoutScreen";

const MyLuggagePage = React.memo(() => {
  const account = useAccount();

  const dispatch = useDispatch();

  useEffect(() => {
    let defaultFocusKey = "logout-signin";

    if (account.isLoggedIn) {
      defaultFocusKey = "test-button-2";
    }

    Spotlight.focus(defaultFocusKey);

    dispatch(setDefaultFocusKey(defaultFocusKey));
  }, [account.isLoggedIn, dispatch]);

  return (
    <SpottableBox spotlightId="my-luggage-container">
      <Header
        title={account.isLoggedIn ? translate("navigation.myLuggage") : ""}
      />
      {account.isLoggedIn ? (
        <ContainerBase>
          <Text>로그인 상태</Text>
          <RoundButton spotlightId="test-button-1">버튼 1</RoundButton>
          <RoundButton spotlightId="test-button-2">
            디폴트 포커스 확인
          </RoundButton>
        </ContainerBase>
      ) : (
        <LogoutScreen />
      )}
    </SpottableBox>
  );
});

export default MyLuggagePage;

const MyLuggageWrapper = styled.div``;

const SpottableBox = SpotlightContainerDecorator(MyLuggageWrapper);

const ContainerBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-size: 100%;
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
