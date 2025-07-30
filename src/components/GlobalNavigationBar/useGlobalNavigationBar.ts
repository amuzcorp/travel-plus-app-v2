import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spotlight from "@enact/spotlight";
import {
  gnbContainerKeys,
  homeContainerKeys,
} from "../../core/constants/globalConstant";
import { RootState } from "../../core/store";
import {
  collapse,
  expand,
  GnbState,
  GnbStateType,
} from "../../core/store/slices/gnbSlice";

// interface UseGlobalNavigationBarProps {}

interface UseGlobalNavigationBarResult {
  gnbState: GnbStateType;
  expanded: boolean;
  collapsed: boolean;

  expandGnb: () => void;
  collapseGnb: () => void;

  focus: (enterKey: string) => void;
  blur: () => void;
}

const useGlobalNavigationBarHook = (): UseGlobalNavigationBarResult => {
  const lastEnterKey = useRef<string>(homeContainerKeys.carousel);

  const gnbState = useSelector((state: RootState) => state.gnb.value);
  const selectedButton = useSelector(
    (state: RootState) => state.gnb.selectedButton
  );
  const dispatch = useDispatch();

  const expandGnb = useCallback(() => {
    dispatch(expand());
  }, [dispatch]);

  const collapseGnb = useCallback(() => {
    dispatch(collapse());
  }, [dispatch]);

  const focus = useCallback(
    (enterKey: string) => {
      lastEnterKey.current = enterKey;

      Spotlight.setActiveContainer(gnbContainerKeys.gnb);
      expandGnb();

      const key = "gnb-menu-" + selectedButton;

      requestAnimationFrame(() => {
        Spotlight.focus(key);
      });
    },
    [selectedButton, expandGnb]
  );

  const blur = useCallback(() => {
    Spotlight.setActiveContainer(lastEnterKey.current);
    collapseGnb();

    requestAnimationFrame(() => {
      Spotlight.focus(lastEnterKey.current);
    });
  }, [collapseGnb]);

  return {
    gnbState: gnbState,
    expanded: gnbState === GnbState.Expanded,
    collapsed: gnbState === GnbState.Collapsed,

    expandGnb: expandGnb,
    collapseGnb: collapseGnb,

    focus: focus,
    blur: blur,
  };
};

export const useGlobalNavigationBar = useGlobalNavigationBarHook;
