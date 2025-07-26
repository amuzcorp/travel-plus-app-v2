import React from "react";
import styled from "styled-components";

import Header from "../../components/Headers/Header";
import { translate } from "../../utils/translate";
import LogoutScreen from "./components/LogoutScreen";

const MyLuggagePage = React.memo(() => {
  // TODO
  // user가 로그인 상태일 때만 헤더에 타이틀 보여줌
  // 로그인 상태 확인해서 Screen 분기 처리 필요

  return (
    <MyLuggageWrapper>
      <Header title={translate("navigation.myLuggage")} />
      <LogoutScreen />
    </MyLuggageWrapper>
  );
});

export default MyLuggagePage;

const MyLuggageWrapper = styled.div``;
