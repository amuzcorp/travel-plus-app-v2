import React, { useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import RoundButton from "../../../components/Buttons/RoundButton/RoundButton";
import Spacing from "../../../components/Spacing/Spacing";
import Text from "../../../components/Texts/Text";
import { rem } from "../../../utils/rem";
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
  width: ${rem(750)};
  position: absolute;
  left: ${rem(257)};
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

  return (
    <SpotlightLogoutContainer spotlightId="logoutScreen" spotlightRestrict="self-only">
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
        >
          {translate("account.signIn")}
        </RoundButton>
      </MyLuggageLogoutContent>
    </SpotlightLogoutContainer>
  );
});

export default LogoutScreen;
