import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Cell, Column } from "@enact/ui/Layout";
import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator, {
  SpotlightContainerDecoratorConfig,
} from "@enact/spotlight/SpotlightContainerDecorator";

import {
  collapse,
  expand,
  GnbState,
  updateWantToCollapse,
} from "../../core/store/slices/gnbSlice";
import { RootState } from "../../core/store/store";
import { GNBOverlay, GNBWrapper } from "./GlobalNavigationBar.style";
import GlobalNavigationBarButton from "../Buttons/GlobalNavigationBarButton/GlobalNavigationBarButton";

const spotlightConfig: SpotlightContainerDecoratorConfig = {
  restrict: "self-only",
  defaultElement: "luggage",
};

const SpotlightContainer = SpotlightContainerDecorator(spotlightConfig, "div");

const GlobalNavigationBar: React.FC = React.memo(() => {
  const gnbState = useSelector((state: RootState) => state.gnb.value);
  const wantToCollapse = useSelector(
    (state: RootState) => state.gnb.wantToCollapse
  );
  const dispatch = useDispatch();

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

  const GNBOverlayProps = {
    $expanded: gnbState === GnbState.Expanded,
  };

  const GNBWrapperProps = useMemo(() => {
    return {
      $expanded: gnbState === GnbState.Expanded,
      onFocus: onFocus,
      onBlur: onBlur,
      onMouseEnter: expandGnb,
      onMouseLeave: collapseGnb,
    };
  }, [gnbState, onFocus, onBlur, expandGnb, collapseGnb]);

  return (
    <SpotlightContainer
      spotlightRestrict={wantToCollapse ? undefined : "self-only"}
    >
      <GNBOverlay {...GNBOverlayProps} />
      <GNBWrapper {...GNBWrapperProps}>
        <Column>
          <Cell shrink>
            {/* <GlobalNavigationBarButton icon="profile" index={0} /> */}
          </Cell>

          {/* spacer */}
          <Cell />

          <Cell shrink>
            <GlobalNavigationBarButton type="home" index={1} />
          </Cell>
          <Cell shrink>
            <GlobalNavigationBarButton type="search" index={2} />
          </Cell>
          <Cell shrink>
            <GlobalNavigationBarButton type="destination" index={3} />
          </Cell>
          <Cell shrink>
            <GlobalNavigationBarButton type="luggage" index={4} />
          </Cell>

          {/* spacer */}
          <Cell />

          <Cell shrink>
            <GlobalNavigationBarButton type="settings" index={5} />
          </Cell>
          <Cell shrink>
            <GlobalNavigationBarButton type="exit" index={6} />
          </Cell>
        </Column>
      </GNBWrapper>
    </SpotlightContainer>
  );
});

export default GlobalNavigationBar;
