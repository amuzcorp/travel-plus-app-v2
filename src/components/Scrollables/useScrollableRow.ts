import Spotlight from "@enact/spotlight";
import React, { ReactNode, useCallback, useRef } from "react";

export interface UseScrollableRowResult {
  ref: React.RefObject<any>;
  onKeyDown: (ev: React.KeyboardEvent<Element>) => void;
}

const useScrollableRowHook = (): UseScrollableRowResult => {
  const ref = useRef<any>(null);

  const onKeyDown = useCallback(
    (ev: React.KeyboardEvent<Element>) => {
      let target: null | ReactNode | Element;

      requestAnimationFrame(() => {
        target = Spotlight.getCurrent();

        if (target instanceof Element) {
          const targetRect = target.getBoundingClientRect();
          const targetLeft = targetRect.left;
          const diff = targetLeft - 130;

          const wrapper = ref.current as HTMLElement;

          const scrollLeft = wrapper.scrollLeft;

          wrapper.scroll({
            left: Math.max(0, scrollLeft + diff),
            behavior: "smooth",
          });
        }
      });
    },
    [ref]
  );

  return {
    ref: ref,
    onKeyDown: onKeyDown,
  };
};

export const useScrollableRow = useScrollableRowHook;
