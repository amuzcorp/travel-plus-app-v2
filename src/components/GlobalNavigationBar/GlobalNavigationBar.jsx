import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout, { Cell, Column } from "@enact/ui/Layout";
import Spotlight from "@enact/spotlight";

import { collapse, expand, GnbState } from "../../core/store/slices/gnbSlice";
import { GNBWrapper } from "./GlobalNavigationBar.style";
import GlobalNavigationBarButton from "../Buttons/GlobalNavigationBarButton";

const GlobalNavigationBar = () => {
  const gnbState = useSelector((state) => state.gnb.value);
  const dispatch = useDispatch();

  const collapseGnb = useCallback(() => {
    dispatch(collapse());
  }, [dispatch]);

  const expandGnb = useCallback(() => {
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

  const GNBWrapperProps = {
    shrink: true,
    $expanded: gnbState === GnbState.Expanded,
    onFocus: onFocus,
    onBlur: onBlur,
    onMouseEnter: expandGnb,
    onMouseLeave: collapseGnb,
  };

  return (
    <GNBWrapper {...GNBWrapperProps}>
      <Column align="center">
        <Cell shrink>
          <Column>
            <GlobalNavigationBarButton icon="travel plus" useFocus={false} />
            <GlobalNavigationBarButton icon="profile" />
          </Column>
        </Cell>
        <Cell>
          <Layout orientation="vertical" align="center center">
            <Cell shrink>
              <GlobalNavigationBarButton icon="home" />
            </Cell>
            <Cell shrink>
              <GlobalNavigationBarButton icon="help" />
            </Cell>
          </Layout>
        </Cell>
        <Cell shrink>
          <GlobalNavigationBarButton icon="gear" />
        </Cell>
      </Column>
    </GNBWrapper>
  );
};

export default GlobalNavigationBar;
