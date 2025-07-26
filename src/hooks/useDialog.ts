import Spotlight from "@enact/spotlight";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../core/store";
import { hide, show } from "../core/store/slices/dialogSlice";

interface DialogPayload {
  title?: string;
  content?: string;
  focusIdOnDismiss?: string;
}

export const useDialog = () => {
  const dispatch = useDispatch();
  const { open, title, content, focusIdOnDismiss } = useSelector(
    (state: RootState) => state.dialog
  );

  const showDialog = (payload: DialogPayload) => {
    dispatch(show(payload));
  };

  const hideDialog = () => {
    dispatch(hide());
  };

  const prevOpenRef = useRef(open);

  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    if (wasOpen && !open && focusIdOnDismiss) {
      requestAnimationFrame(() => {
        Spotlight.focus(focusIdOnDismiss);
      });
    }
    prevOpenRef.current = open;
  }, [open, focusIdOnDismiss]);

  return {
    open,
    title,
    content,
    showDialog,
    hideDialog,
  };
};
