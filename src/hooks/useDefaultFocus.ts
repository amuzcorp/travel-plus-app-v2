import Spotlight from "@enact/spotlight";
import { useEffect } from "react";
import DefaultFocusInterface from "../store/slices/defaultFocusInterface";

export interface DefaultFocusProps {
  defaultFocusKey: string | null;
  focusInterface: DefaultFocusInterface | null;
}

export function useDefaultFocus(props: DefaultFocusProps): void {
  useEffect(() => {
    let lastFocusedTarget;

    if (props.focusInterface === null) {
      lastFocusedTarget = null;
    } else {
      lastFocusedTarget = props.focusInterface?.lastFocused;
    }

    if (lastFocusedTarget) {
      Spotlight.focus(lastFocusedTarget);
    } else if (props.defaultFocusKey) {
      Spotlight.focus(props.defaultFocusKey);
    }
  });
}
