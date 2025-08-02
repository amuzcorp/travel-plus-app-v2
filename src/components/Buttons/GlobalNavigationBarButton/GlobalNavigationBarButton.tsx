import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Spotlight from "@enact/spotlight";

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

import { RootState } from "src/store";
import { useGlobalNavigationBar } from "../../../components/GlobalNavigationBar/useGlobalNavigationBar";
import { useAccount } from "../../../hooks/useAccount";
import useCallLgAccountApp from "../../../hooks/useCallLgAccountApp";
import useIsWebOS6 from "../../../hooks/useIsWebOS6";
import useSpeak from "../../../hooks/useSpeak";
import { select } from "../../../store/slices/gnbSlice";
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
}

export default React.memo(
  ({
    id,
    spotlightId,
    type = "home",
    selected = false,
    marginBottom,
  }: GlobalNavigationBarButtonProps) => {
    /// 로그인 정보
    const account = useAccount();

    /// webOS6 여부
    const isWebOS6 = useIsWebOS6();

    /// 기본 상태
    const Idle = gnbTypeData[type].element;

    /// 선택되었을 때
    const Focused = gnbTypeData[type].selectedElement;

    const { expanded, expandGnb, collapseGnb, blur } = useGlobalNavigationBar();

    const selectedButton = useSelector(
      (state: RootState) => state.gnb.selectedButton,
      (prev, next) => prev === next
    );

    const { speak } = useSpeak();

    const callLgAccountApp = useCallLgAccountApp();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onFocus = useCallback(
      (ev: React.FocusEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (!expanded) {
          expandGnb();
        }
        requestAnimationFrame(() => {
          const current = Spotlight.getCurrent();
          if (!(current instanceof HTMLElement)) return;

          const spotId = current.getAttribute("data-spotlight-id");
          if (!spotId) return;

          // 접두어 제거 로직 추가
          const prefix = "gnb-menu-";
          const keyCandidate = spotId.startsWith(prefix)
            ? spotId.slice(prefix.length)
            : spotId;

          const keys = Object.keys(gnbTypeData) as (keyof GnbType)[];
          const isValidKey = keys.includes(keyCandidate as keyof GnbType);
          if (!isValidKey) return;

          const targetKey = keyCandidate as keyof GnbType;
          const targetLabel = gnbTypeData[targetKey].label;
          const index = keys.indexOf(targetKey);
          const totalCount = keys.length;

          const postfix = !expanded
            ? translate("common.tabNumber", {
                number: index + 1,
                total: totalCount,
              })
            : translate("common.button");

          speak(`${translate(targetLabel)} ${postfix}`);
        });
      },
      [expanded, expandGnb, speak]
    );

    const onKeyDown = useCallback(
      (ev: React.KeyboardEvent) => {
        if (ev.key === "ArrowRight") {
          ev.preventDefault();
          ev.stopPropagation();
          blur();
        } else if (ev.key === "ArrowUp") {
          const currentUp = Spotlight.getCurrent();

          if (currentUp instanceof HTMLElement) {
            if (currentUp.id === "gnb-menu-account") {
              ev.preventDefault();
              ev.stopPropagation();
              Spotlight.focus("gnb-menu-exit");
            }
          }
        } else if (ev.key === "ArrowDown") {
          const currentDown = Spotlight.getCurrent();

          if (currentDown instanceof HTMLElement) {
            if (currentDown.id === "gnb-menu-exit") {
              ev.preventDefault();
              ev.stopPropagation();
              Spotlight.focus("gnb-menu-account");
            }
          }
        }
      },
      [blur]
    );

    const onClickButton = useCallback(async () => {
      if (selectedButton === type) {
        // gnb 닫히면서, 이전 포커스로 이동
        blur();
        return;
      }
      if (type === "account") {
        await callLgAccountApp(true);
        return;
      }

      dispatch(select(type));
      let targetPath: string;

      switch (type) {
        case "home":
          targetPath = "/home";
          break;
        case "search":
          targetPath = "/search";
          break;
        case "destination":
          targetPath = "/destination";
          break;
        case "luggage":
          targetPath = "/my-luggage";
          break;
        case "settings":
          targetPath = "/settings";
          break;
        case "exit":
          targetPath = "/test";
          break;
        default:
          targetPath = "/home";
          break;
      }

      navigate(targetPath, { replace: true });
      collapseGnb();
    }, [
      dispatch,
      navigate,
      collapseGnb,
      callLgAccountApp,
      blur,
      selectedButton,
      type,
    ]);

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
        onClick={onClickButton}
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
