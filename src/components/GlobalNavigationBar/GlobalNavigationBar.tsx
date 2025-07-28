import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator, {
  SpotlightContainerDecoratorConfig,
} from "@enact/spotlight/SpotlightContainerDecorator";

import { useNavigate } from "react-router-dom";
import { RootState } from "../../core/store";
import {
  collapse,
  expand,
  GnbState,
  select,
  updateWantToCollapse,
} from "../../core/store/slices/gnbSlice";
import useCallLgAccountApp from "../../hooks/useCallLgAccountApp";
import { speak } from "../../utils/audioGuidance";
import { translate } from "../../utils/translate";
import GlobalNavigationBarButton, {
  GnbType,
  gnbTypeData,
} from "../Buttons/GlobalNavigationBarButton/GlobalNavigationBarButton";
import {
  GNBOverlay,
  GNBWrapper,
  SectionWrapper,
} from "./GlobalNavigationBar.style";

const spotlightConfig: SpotlightContainerDecoratorConfig = {
  restrict: "self-only",
  defaultElement: "luggage",
};

const SpotlightContainer = SpotlightContainerDecorator(spotlightConfig, "div");

const topSections: string[] = ["account"];
const middleSections: string[] = ["home", "search", "destination", "luggage"];
const bottomSections: string[] = ["settings", "exit"];

const GlobalNavigationBar: React.FC = React.memo(() => {
  const gnbState = useSelector((state: RootState) => state.gnb.value);
  const wantToCollapse = useSelector(
    (state: RootState) => state.gnb.wantToCollapse
  );
  const selectedButton = useSelector(
    (state: RootState) => state.gnb.selectedButton,
    (prev, next) => prev === next
  );
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const collapseGnb = useCallback(() => {
    dispatch(collapse());

    dispatch(updateWantToCollapse(true));
  }, [dispatch]);

  const expandGnb = useCallback(() => {
    dispatch(expand());

    dispatch(updateWantToCollapse(false));
  }, [dispatch]);

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
  }, [expandGnb, expanded]);

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
    [dispatch, navigate, collapseGnb, callLgAccountApp]
  );

  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === "ArrowRight") {
        collapseGnb();
        Spotlight.move("right");
        ev.preventDefault();
      }
    },
    [collapseGnb]
  );

  const generateButton = useCallback(
    (typeValue: keyof GnbType, isLast: boolean, onClick: Function) => (
      <GlobalNavigationBarButton
        type={typeValue}
        marginBottom={!isLast ? 20 : 0}
        selected={typeValue === selectedButton}
        onClick={onClick}
        onKeyDown={onKeyDown}
        key={"gnb-menu-" + typeValue}
      />
    ),
    [selectedButton, onKeyDown]
  );

  useEffect(() => {
    if (gnbState === GnbState.Expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [gnbState]);

  return (
    <SpotlightContainer
      spotlightRestrict={wantToCollapse ? "self-first" : "self-only"}
    >
      <GNBOverlay {...GNBOverlayProps} />
      <GNBWrapper {...GNBWrapperProps}>
        <SectionWrapper>
          {topSections.map((value, index) => {
            return generateButton(
              value as keyof GnbType,
              index === topSections.length - 1,
              () => onClickButton(value)
            );
          })}
        </SectionWrapper>

        <SectionWrapper>
          {middleSections.map((value, index) => {
            return generateButton(
              value as keyof GnbType,
              index === middleSections.length - 1,
              () => onClickButton(value)
            );
          })}
        </SectionWrapper>

        <SectionWrapper>
          {bottomSections.map((value, index) => {
            return generateButton(
              value as keyof GnbType,
              index === bottomSections.length - 1,
              () => onClickButton(value)
            );
          })}
        </SectionWrapper>
      </GNBWrapper>
    </SpotlightContainer>
  );
});

export default GlobalNavigationBar;
