import React, { useCallback } from "react";

import BaseAccessibleComponent from "../../../components/BaseAccessibleComponent";

import IGnbUser from "../../../assets/icons/gnb/IGnbUser";
import IGnbUserSelected from "../../../assets/icons/gnb/IGnbUserSelected";

import IGnbUser6 from "../../../assets/icons/gnb/IGnbUser6";
import IGnbUserSelected6 from "../../../assets/icons/gnb/IGnbUserSelected6";

import IGnbHome from "../../../assets/icons/gnb/IGnbHome";
import IGnbHomeSelected from "../../../assets/icons/gnb/IGnbHomeSelected";

import IGnbSearch from "../../../assets/icons/gnb/IGnbSearch";
import IGnbSearchSelected from "../../../assets/icons/gnb/IGnbSearchSelected";

import IGnbDestination from "../../../assets/icons/gnb/IGnbDestination";
import IGnbDestinationSelected from "../../../assets/icons/gnb/IGnbDestinationSelected";

import IGnbLuggage from "../../../assets/icons/gnb/IGnbLuggage";
import IGnbLuggageSelected from "../../../assets/icons/gnb/IGnbLuggageSelected";

import IGnbSettings from "../../../assets/icons/gnb/IGnbSettings";
import IGnbSettingsSelected from "../../../assets/icons/gnb/IGnbSettingsSelected";

import IGnbExit from "../../../assets/icons/gnb/IGnbExit";
import IGnbExitSelected from "../../../assets/icons/gnb/IGnbExitSelected";

import { useGlobalNavigationBar } from "../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import { useAccount } from "../../../hooks/useAccount";
import useIsWebOS6 from "../../../hooks/useIsWebOS6";
import { translate } from "../../../utils/translate";
import {
  GlobalNavigationChild,
  GlobalNavigationChildDescription,
  GlobalNavigationChildIcon,
  GlobalNavigationChildLabel,
  GlobalNavigationChildLabelBox,
  IconWrapper,
} from "./GlobalNavigationBarButton.style";
import ProfileIcon from "./ProfileIcon";

export interface GnbType {
  account: ElementOption;
  home: ElementOption;
  search: ElementOption;
  destination: ElementOption;
  luggage: ElementOption;
  settings: ElementOption;
  exit: ElementOption;
}

interface ElementOption {
  label: string;
  element: React.MemoExoticComponent<() => React.JSX.Element>;
  selectedElement: React.MemoExoticComponent<() => React.JSX.Element>;
}

export const gnbTypeData: GnbType = {
  account: {
    label: "account.lgAccount",
    element: IGnbUser,
    selectedElement: IGnbUserSelected,
  },
  home: {
    label: "navigation.home",
    element: IGnbHome,
    selectedElement: IGnbHomeSelected,
  },
  search: {
    label: "navigation.search",
    element: IGnbSearch,
    selectedElement: IGnbSearchSelected,
  },
  destination: {
    label: "navigation.destinations",
    element: IGnbDestination,
    selectedElement: IGnbDestinationSelected,
  },
  luggage: {
    label: "navigation.myLuggage",
    element: IGnbLuggage,
    selectedElement: IGnbLuggageSelected,
  },
  settings: {
    label: "navigation.settings",
    element: IGnbSettings,
    selectedElement: IGnbSettingsSelected,
  },
  exit: {
    label: "navigation.exitApp",
    element: IGnbExit,
    selectedElement: IGnbExitSelected,
  },
};

interface GlobalNavigationBarButtonProps {
  id: string;
  spotlightId: string;
  type: keyof GnbType;
  selected?: boolean;
  marginBottom?: number;
  onClick?: Function;
  onKeyDown?: (ev: React.KeyboardEvent<any>) => void;
}

export default React.memo(
  ({
    id,
    spotlightId,
    type = "home",
    selected = false,
    marginBottom,
    onClick = () => {},
    onKeyDown = (ev) => {},
  }: GlobalNavigationBarButtonProps) => {
    /// 로그인 정보
    const account = useAccount();

    /// webOS6 여부
    const isWebOS6 = useIsWebOS6();

    /// 기본 상태
    const Idle = gnbTypeData[type].element;

    /// 선택되었을 때
    const Focused = gnbTypeData[type].selectedElement;

    const { expanded, expandGnb } = useGlobalNavigationBar();

    const onFocus = useCallback(
      (ev: React.FocusEvent) => {
        if (!expanded) {
          expandGnb();
        }
      },
      [expandGnb]
    );

    const Icon = () => {
      let iconElement;

      if (type !== "account" || !account.isLoggedIn) {
        iconElement = (
          <>
            <IconWrapper className="idle">
              <Idle />
            </IconWrapper>
            <IconWrapper className="focused">
              <Focused />
            </IconWrapper>
          </>
        );
      } else if (isWebOS6) {
        iconElement = (
          <>
            <IconWrapper className="idle">
              <IGnbUser6 />
            </IconWrapper>
            <IconWrapper className="focused">
              <IGnbUserSelected6 />
            </IconWrapper>
          </>
        );
      } else {
        iconElement = (
          <IconWrapper>
            <ProfileIcon
              text={account.iconNick ?? "U"}
              bgColor={account.profileBg}
            />
          </IconWrapper>
        );
      }

      return (
        <GlobalNavigationChildIcon className="icon">
          {iconElement}
        </GlobalNavigationChildIcon>
      );
    };

    const Label = () => {
      let labelElement;

      if (type === "account") {
        const useInfo = account.isLoggedIn
          ? isWebOS6
            ? account.userEmail
            : account.nickName
          : "account.lgAccount";

        labelElement = (
          <GlobalNavigationChildLabelBox>
            <GlobalNavigationChildLabel className="label">
              {translate(useInfo)}
            </GlobalNavigationChildLabel>
            {account.isLoggedIn && (
              <GlobalNavigationChildDescription className="description">
                {translate("navigation.switchAccount")}
              </GlobalNavigationChildDescription>
            )}
          </GlobalNavigationChildLabelBox>
        );
      } else {
        labelElement = (
          <GlobalNavigationChildLabel className="label">
            {translate(gnbTypeData[type].label)}
          </GlobalNavigationChildLabel>
        );
      }

      return labelElement;
    };

    return (
      <BaseAccessibleComponent
        id={id}
        spotlightId={spotlightId}
        component={GlobalNavigationChild}
        className={`${selected ? "selected" : ""} ${
          expanded ? "expanded" : ""
        }`}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        $marginBottom={marginBottom}
      >
        <Icon />
        <Label />
      </BaseAccessibleComponent>
    );
  },
  (prev, next) => {
    return prev.selected === next.selected && prev.type === next.type;
  }
);
