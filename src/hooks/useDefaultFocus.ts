import DefaultFocusInterface from "@/core/store/slices/defaultFocusInterface";
import Spotlight from "@enact/spotlight";
import { useEffect } from "react";

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
