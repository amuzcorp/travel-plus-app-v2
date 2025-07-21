import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Cell, Column } from "@enact/ui/Layout";
import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import { collapse, expand, GnbState } from "../../core/store/slices/gnbSlice";
import { RootState } from "../../core/store/store";
import { GNBOverlay, GNBWrapper } from "./GlobalNavigationBar.style";
import GlobalNavigationBarButton from "../Buttons/GlobalNavigationBarButton";

const SpotlightContainer = SpotlightContainerDecorator(
  { restrict: "self-only" },
  "div"
);

const GlobalNavigationBar: React.FC = () => {
  const gnbState = useSelector((state: RootState) => state.gnb.value);
  const dispatch = useDispatch();

  const collapseGnb = useCallback(() => {
    Spotlight.disableSelector("gnb");
    dispatch(collapse());
  }, [dispatch]);

  const expandGnb = useCallback(() => {
    Spotlight.enableSelector("gnb");
    dispatch(expand());
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

  const GNBWrapperProps = {
    id: "gnb",
    shrink: true,
    $expanded: gnbState === GnbState.Expanded,
    onFocus: onFocus,
    onBlur: onBlur,
    onMouseEnter: expandGnb,
    onMouseLeave: collapseGnb,
  };

  return (
    <SpotlightContainer>
      <GNBOverlay {...GNBOverlayProps} />
      <GNBWrapper {...GNBWrapperProps}>
        <Column>
          <Cell shrink>
            <Column>
              <Cell>
                <GlobalNavigationBarButton
                  icon="travel plus"
                  useFocus={false}
                />
              </Cell>
              <Cell>
                <GlobalNavigationBarButton icon="profile" index={0} />
              </Cell>
            </Column>
          </Cell>
          <Cell shrink>
            <Column>
              <Cell>
                <GlobalNavigationBarButton icon="home" />
              </Cell>
              <Cell>
                <GlobalNavigationBarButton icon="help" />
              </Cell>
            </Column>
          </Cell>
          <Cell shrink>
            <Column>
              <Cell>
                <GlobalNavigationBarButton icon="gear" />
              </Cell>
              <Cell>
                <GlobalNavigationBarButton icon="power" />
              </Cell>
            </Column>
          </Cell>
        </Column>
      </GNBWrapper>
    </SpotlightContainer>
  ) as React.ReactElement;
};

export default GlobalNavigationBar;
