import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spotlight from "@enact/spotlight";

import { RootState } from "../core/store";
import { hide, show } from "../core/store/slices/spinnerSlice";

interface SpinnerPayload {
  focusIdOnDismiss?: string;
}

export const useSpinner = () => {
  const dispatch = useDispatch();
  const start = useSelector((state: RootState) => state.spinner.start);
  const focusIdOnDismiss = useSelector(
    (state: RootState) => state.spinner.focusIdOnDismiss
  );

  const showSpinner = (payload: SpinnerPayload) => {
    dispatch(show(payload));
  };

  const hideSpinner = () => {
    dispatch(hide());
  };

  const prevStartRef = useRef(start);

  useEffect(() => {
    const prevStart = prevStartRef.current;

    if (prevStart && !start && focusIdOnDismiss) {
      requestAnimationFrame(() => {
        Spotlight.focus(focusIdOnDismiss);
      });
    }

    prevStartRef.current = start;
  }, [start, focusIdOnDismiss]);

  return { start, showSpinner, hideSpinner };
};
