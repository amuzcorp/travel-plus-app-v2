import React, { KeyboardEvent, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spotlight from "@enact/spotlight";

import { useNavigate } from "react-router-dom";
import {
  GnbBottomSections,
  gnbContainerKeys,
  GnbMiddleSections,
  GnbTopSections,
} from "../../constants/globalConstant";
import useCallLgAccountApp from "../../hooks/useCallLgAccountApp";

import useSpeak from "../../hooks/useSpeak";
import { RootState } from "../../store";
import { select } from "../../store/slices/gnbSlice";
import { translate } from "../../utils/translate";
import GlobalNavigationBarButton, {
  GnbType,
  gnbTypeData,
} from "../Buttons/GlobalNavigationBarButton/GlobalNavigationBarButton";
import {
  GNBOverlay,
  GNBWrapper,
  SectionWrapper,
  SpotlightContainer,
} from "./GlobalNavigationBar.style";
import { useGlobalNavigationBar } from "./useGlobalNavigationBar";

import { useAuthApi } from "../../api/auth/AuthApiProvider";
import { useLunaApi } from "../../api/luna/LunaApiProvider";
import { Account } from "../../entities";
import AccountManager from "../../services/AccountService";
import { setAccountState } from "../../store/slices/accountSlice";

const GlobalNavigationBar: React.FC = React.memo(() => {
  const selectedButton = useSelector(
    (state: RootState) => state.gnb.selectedButton,
    (prev, next) => prev === next
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { expanded, expandGnb, collapseGnb, blur } = useGlobalNavigationBar();
  const { speak } = useSpeak();

  const onFocus = useCallback(() => {
    const isMouse = Spotlight.getPointerMode();
    if (!isMouse) {
      expandGnb();
    }

    // ---- 오디오 가이던스 로직 ----
    const current = Spotlight.getCurrent();
    if (!(current instanceof HTMLElement)) return;

    const spotId = current.getAttribute("data-spot-id");
    if (!spotId) return;

    const keys = Object.keys(gnbTypeData) as (keyof GnbType)[];
    const isValidKey = keys.includes(spotId as keyof GnbType);
    if (!isValidKey) return;

    const targetKey = spotId as keyof GnbType;
    const targetLabel = gnbTypeData[targetKey].label;
    const index = keys.indexOf(targetKey);
    const totalCount = keys.length;

    const postfix = !expanded
      ? translate("common.tabNumber", { number: index + 1, total: totalCount })
      : translate("common.button");

    speak(`${translate(targetLabel)} ${postfix}`);
    // ---- 오디오 가이던스 로직 ----
  }, [expandGnb, expanded, speak]);

  const onBlur = useCallback(() => {
    const isMouse = Spotlight.getPointerMode();
    if (!isMouse) {
      collapseGnb();
    }
  }, [collapseGnb]);

  const GNBOverlayProps = useMemo(() => {
    return {
      className: `${expanded ? "expanded" : ""}`,
    };
  }, [expanded]);

  const GNBWrapperProps = useMemo(() => {
    return {
      className: `${expanded ? "expanded" : ""}`,
      onFocus: onFocus,
      onBlur: onBlur,
      onMouseEnter: expandGnb,
      onMouseLeave: collapseGnb,
    };
  }, [expanded, onFocus, onBlur, expandGnb, collapseGnb]);

  const callLgAccountApp = useCallLgAccountApp();

  const authApi = useAuthApi();
  const lunaApi = useLunaApi();

  const onClickButton = useCallback(
    async (target: string) => {
      if (target === "account") {
        // await callLgAccountApp(true);
        const result = await AccountManager.callLgAccountApp({
          isLogin: true,
          authApi: authApi,
          lunaApi: lunaApi,
        });

        if (result.account === Account.empty()) {
          return;
        }

        dispatch(setAccountState(result.account));

        return;
      }

      dispatch(select(target));
      collapseGnb();

      let targetPath: string;

      switch (target) {
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
    },
    [dispatch, navigate, collapseGnb, callLgAccountApp]
  );

  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === "ArrowRight") {
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

  const generateButton = useCallback(
    (typeValue: keyof GnbType, isLast: boolean, onClick: Function) => {
      const id = "gnb-menu-" + typeValue;

      return (
        <GlobalNavigationBarButton
          id={id}
          spotlightId={id}
          key={id}
          type={typeValue}
          marginBottom={!isLast ? 20 : 0}
          selected={typeValue === selectedButton}
          onClick={onClick}
        />
      );
    },
    [selectedButton]
  );

  const topSection = useMemo(() => {
    return GnbTopSections.map((value, index) =>
      generateButton(
        value as keyof GnbType,
        index === GnbTopSections.length - 1,
        () => onClickButton(value)
      )
    );
  }, [generateButton, onClickButton]);

  const middleSection = useMemo(() => {
    return GnbMiddleSections.map((value, index) => {
      return generateButton(
        value as keyof GnbType,
        index === GnbMiddleSections.length - 1,
        () => onClickButton(value)
      );
    });
  }, [generateButton, onClickButton]);

  const bottomSection = useMemo(() => {
    return GnbBottomSections.map((value, index) => {
      return generateButton(
        value as keyof GnbType,
        index === GnbBottomSections.length - 1,
        () => onClickButton(value)
      );
    });
  }, [generateButton, onClickButton]);

  return (
    <SpotlightContainer
      spotlightId={gnbContainerKeys.gnb}
      spotlightRestrict="self-only"
      onKeyDown={onKeyDown}
    >
      <GNBOverlay {...GNBOverlayProps} />
      <GNBWrapper {...GNBWrapperProps}>
        <SectionWrapper>{topSection}</SectionWrapper>

        <SectionWrapper>{middleSection}</SectionWrapper>

        <SectionWrapper>{bottomSection}</SectionWrapper>
      </GNBWrapper>
    </SpotlightContainer>
  );
});

export default GlobalNavigationBar;
