import React, { useCallback, useState } from "react";
import styled, { useTheme } from "styled-components";

import RoundButton from "../../../components/Buttons/RoundButton/RoundButton";
import { useGlobalNavigationBar } from "../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import Spacing from "../../../components/Spacing/Spacing";
import Text from "../../../components/Texts/Text";
import useBlockFocusDirection from "../../../hooks/useBlockFocusDirection";
import useCallLgAccountApp from "../../../hooks/useCallLgAccountApp";
import { translate } from "../../../utils/translate";
import LogoutBackground from "./LogoutBackground";

// Spotlight Container
const ContainerBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-size: 100%;
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
`;

// Content Area
const MyLuggageLogoutContent = styled.div`
  width: 750px;
  position: absolute;
  left: 257px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoutScreen = React.memo(() => {
  const theme = useTheme();
  const [hasSpoken, setHasSpoken] = useState(false);

  const { focus } = useGlobalNavigationBar();

  // 첫 진입 디폴트 포커스
  // useEffect(() => {
  //   Spotlight.focus("logout-signin");
  // }, []);

  const getSpeakerText = (keys: string[]) => {
    const base = translate(keys);
    return !hasSpoken
      ? `${translate([
          "navigation.myLuggage",
          "luggage.packFavorites",
          "luggage.signInToAddFavorites",
          "account.signIn",
          "common.button",
        ])} ${base}`
      : base;
  };

  const handleFirstFocus = useCallback(() => {
    if (!hasSpoken) {
      setHasSpoken(true);
    }
  }, [hasSpoken, setHasSpoken]);

  const onKeyDown = useBlockFocusDirection({
    // 이후에는 'ArrowUp'시 헤더의 알림 버튼으로 가도록 처리해야함
    blockDirections: ["ArrowUp", "ArrowDown", "ArrowLeft"],
    onKeyDown: (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        focus("logout-signin");
      }
    },
  });

  const callLgAccountApp = useCallLgAccountApp();

  const handleLogin = useCallback(async () => {
    await callLgAccountApp(true);
  }, [callLgAccountApp]);

  return (
    <ContainerBase>
      <div style={{ position: "absolute", top: "0", left: "0" }}>
        <LogoutBackground />
      </div>
      <MyLuggageLogoutContent>
        <Text textStyle="headerHugeSb" maxLine={0} wordBreak="keep-all">
          {translate("luggage.packFavorites")}
        </Text>
        <Spacing size={30} />
        <Text
          textStyle="headerMdRg"
          maxLine={0}
          color={theme.colors.text.secondary}
          wordBreak="keep-all"
        >
          {translate("luggage.signInToAddFavorites")}
        </Text>
        <Spacing size={50} />
        <RoundButton
          isSmall
          onFocus={handleFirstFocus}
          spotlightId="logout-signin"
          speaker={getSpeakerText(["account.signIn", "common.button"])}
          onKeyDown={onKeyDown}
          onClick={handleLogin}
        >
          {translate("account.signIn")}
        </RoundButton>
      </MyLuggageLogoutContent>
    </ContainerBase>
  );
});

export default LogoutScreen;
