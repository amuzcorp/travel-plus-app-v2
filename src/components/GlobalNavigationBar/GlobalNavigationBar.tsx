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
import GlobalNavigationBarButton, {
  GnbType,
} from "../Buttons/GlobalNavigationBarButton/GlobalNavigationBarButton";
import {
  GNBOverlay,
  GNBWrapper,
  SectionWrapper,
  SpotlightContainer,
} from "./GlobalNavigationBar.style";
import { useGlobalNavigationBar } from "./useGlobalNavigationBar";

const GlobalNavigationBar: React.FC = React.memo(() => {
  const selectedButton = useSelector(
    (state: RootState) => state.gnb.selectedButton,
    (prev, next) => prev === next
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { expanded, expandGnb, collapseGnb, blur } = useGlobalNavigationBar();
  const { speak } = useSpeak();

  const GNBOverlayProps = useMemo(() => {
    return {
      className: `${expanded ? "expanded" : ""}`,
    };
  }, [expanded]);

  const GNBWrapperProps = useMemo(() => {
    return {
      className: `${expanded ? "expanded" : ""}`,
      onMouseEnter: expandGnb,
      onMouseLeave: collapseGnb,
    };
  }, [expanded, expandGnb, collapseGnb]);

  const callLgAccountApp = useCallLgAccountApp();

  const onClickButton = useCallback(
    async (target: string) => {
      if (target === "account") {
        await callLgAccountApp(true);
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
    [dispatch, navigate, collapseGnb]
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
    [collapseGnb]
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
