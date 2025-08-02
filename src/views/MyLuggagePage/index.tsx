import React from "react";
import styled from "styled-components";

import Header from "../../components/Headers/Header";
import Text from "../../components/Texts/Text";
import { useAccount } from "../../hooks/useAccount";
import { translate } from "../../utils/translate";
import LogoutScreen from "./components/LogoutScreen";

const MyLuggagePage = React.memo(() => {
  const account = useAccount();

  return (
    <MyLuggageWrapper>
      <Header
        title={account.isLoggedIn ? translate("navigation.myLuggage") : ""}
      />
      {account.isLoggedIn ? (
        <ContainerBase>
          <Text>로그인 햇당꼐~!</Text>
        </ContainerBase>
      ) : (
        <LogoutScreen />
      )}
    </MyLuggageWrapper>
  );
});

export default MyLuggagePage;

const MyLuggageWrapper = styled.div``;

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
