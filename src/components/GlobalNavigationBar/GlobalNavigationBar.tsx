import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator, {
  SpotlightContainerDecoratorConfig,
} from "@enact/spotlight/SpotlightContainerDecorator";

import { RootState } from "../../core/store";
import {
  collapse,
  expand,
  GnbState,
  select,
  updateWantToCollapse,
} from "../../core/store/slices/gnbSlice";
import GlobalNavigationBarButton, {
  GnbType,
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

const topSections: string[] = [];
const middleSections: string[] = ["home", "search", "destination", "luggage"];
const bottomSections: string[] = ["settings", "exit"];

const GlobalNavigationBar: React.FC = React.memo(() => {
  const gnbState = useSelector((state: RootState) => state.gnb.value);
  const selectedButton = useSelector(
    (state: RootState) => state.gnb.selectedButton,
    (prev, next) => prev === next
  );
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

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
  }, [expandGnb]);

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

  const onClickButton = useCallback(
    (target: string) => {
      dispatch(select(target));
    },
    [dispatch]
  );

  const generateButton = useCallback(
    (typeValue: keyof GnbType, isLast: boolean, onClick: Function) => (
      <GlobalNavigationBarButton
        type={typeValue}
        marginBottom={isLast ? 20 : undefined}
        selected={typeValue === selectedButton}
        onClick={onClick}
      />
    ),
    [selectedButton]
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
    // spotlightRestrict={wantToCollapse ? undefined : "self-only"}
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
