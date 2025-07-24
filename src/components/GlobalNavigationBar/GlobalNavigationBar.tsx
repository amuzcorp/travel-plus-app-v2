import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator, {
  SpotlightContainerDecoratorConfig,
} from "@enact/spotlight/SpotlightContainerDecorator";

import {
  collapse,
  expand,
  GnbState,
  select,
  updateWantToCollapse,
} from "../../core/store/slices/gnbSlice";
import { RootState } from "../../core/store/store";
import {
  GNBOverlay,
  GNBWrapper,
  SectionWrapper,
} from "./GlobalNavigationBar.style";
import GlobalNavigationBarButton, {
  GnbType,
} from "../Buttons/GlobalNavigationBarButton/GlobalNavigationBarButton";

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
  }, [expanded, gnbState, onFocus, onBlur, expandGnb, collapseGnb]);

  const onClickButton = useCallback(
    (target: string) => {
      dispatch(select(target));
    },
    [dispatch]
  );

  const generateButton = useCallback(
    (typeValue: keyof GnbType) => {
      return (
        <GlobalNavigationBarButton
          type={typeValue}
          selected={typeValue === selectedButton}
          onClick={() => {
            onClickButton(typeValue);
          }}
        />
      );
    },
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
          {topSections.map((value, __) => {
            return generateButton(value as keyof GnbType);
          })}
        </SectionWrapper>

        <SectionWrapper>
          {middleSections.map((value, __) => {
            return generateButton(value as keyof GnbType);
          })}
        </SectionWrapper>

        <SectionWrapper>
          {bottomSections.map((value, __) => {
            return generateButton(value as keyof GnbType);
          })}
        </SectionWrapper>
      </GNBWrapper>
    </SpotlightContainer>
  );
});

export default GlobalNavigationBar;
