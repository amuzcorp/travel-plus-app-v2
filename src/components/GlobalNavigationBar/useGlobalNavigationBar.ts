import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spotlight from "@enact/spotlight";
import { RootState } from "../../core/store";
import {
  collapse,
  expand,
  GnbState,
  GnbStateType,
  setLastEnterKey,
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

  onKeyDownOnScrollable: (ev: React.KeyboardEvent, index: number) => void;
  onKeyUpOnScrollable: (ev: React.KeyboardEvent, index: number) => boolean;
}

const useGlobalNavigationBarHook = (): UseGlobalNavigationBarResult => {
  const lastEnterKey = useSelector(
    (state: RootState) => state.gnb.lastEnterKey
  );
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
      dispatch(setLastEnterKey(enterKey));

      console.log(enterKey);

      // Spotlight.setActiveContainer(gnbContainerKeys.gnb);
      expandGnb();

      const key = "gnb-menu-" + selectedButton;

      requestAnimationFrame(() => {
        Spotlight.focus(key);
      });
    },
    [dispatch, selectedButton, expandGnb]
  );

  const blur = useCallback(() => {
    // Spotlight.setActiveContainer(lastEnterKey);
    collapseGnb();

    requestAnimationFrame(() => {
      Spotlight.focus(lastEnterKey);
    });
  }, [lastEnterKey, collapseGnb]);

  const moving = useRef(false);
  const startIndex = useRef(-1);

  const onKeyDownOnScrollable = useCallback(
    (ev: React.KeyboardEvent, index: number) => {
      if (!moving.current) {
        moving.current = true;
        startIndex.current = index;
      }
    },
    []
  );

  const onKeyUpOnScrollable = useCallback(
    (ev: React.KeyboardEvent, index: number): boolean => {
      let result = false;

      if (startIndex.current === index && ev.key === "ArrowLeft") {
        result = true;
      }

      moving.current = false;
      startIndex.current = -1;

      return result;
    },
    []
  );

  return {
    gnbState: gnbState,
    expanded: gnbState === GnbState.Expanded,
    collapsed: gnbState === GnbState.Collapsed,

    expandGnb: expandGnb,
    collapseGnb: collapseGnb,

    focus: focus,
    blur: blur,

    onKeyDownOnScrollable: onKeyDownOnScrollable,
    onKeyUpOnScrollable: onKeyUpOnScrollable,
  };
};

export const useGlobalNavigationBar = useGlobalNavigationBarHook;
