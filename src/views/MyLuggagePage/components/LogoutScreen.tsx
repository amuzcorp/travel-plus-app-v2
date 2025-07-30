import React, { useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import RoundButton from "../../../components/Buttons/RoundButton/RoundButton";
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

const SpotlightLogoutContainer = SpotlightContainerDecorator(
  { restrict: "self-only" },
  ContainerBase
);

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

  useEffect(() => {
    const spottables = Spotlight.getSpottableDescendants("logoutScreen");
    if (spottables.length > 0) {
      Spotlight.focus(spottables[0]);
    }
  }, []);

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
    blockDirections: ["ArrowUp", "ArrowDown", "ArrowLeft"],
    onKeyDown: (e) => {
      if (e.key === "ArrowLeft") {
        Spotlight.focus("luggage"); // 안먹힘
        e.preventDefault();
      }
    },
  });

  const callLgAccountApp = useCallLgAccountApp();

  const handleLogin = useCallback(async () => {
    await callLgAccountApp(true);
  }, [callLgAccountApp]);

  return (
    <SpotlightLogoutContainer
      spotlightId="logoutScreen"
      spotlightRestrict={"none"}
    >
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
    </SpotlightLogoutContainer>
  );
});

export default LogoutScreen;
