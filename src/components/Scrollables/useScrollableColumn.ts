import Spotlight from "@enact/spotlight";
import React, { useCallback, useEffect, useRef, useState } from "react";

const ARROWRIGHT = "ArrowRight";
const ARROWLEFT = "ArrowLeft";

export interface ScrollToTargetProps {
  targetIndex: number;
  useScroll?: boolean;
}

export interface UseScrollableColumnResult {
  ref: React.RefObject<any>;
  offset: number;
  onKeyDown: (ev: React.KeyboardEvent, index: number) => void;
  onKeyUp: (ev: React.KeyboardEvent, index: number) => void;
  scrollToTarget: ({ targetIndex, useScroll }: ScrollToTargetProps) => void;
}

export interface useScrollableColumnHookProps {
  containerId: string;
  contentHeight: number;
  contentGap: number;
  maxDataLength: number;
  onScroll?: (index: number, children: React.ReactNode[]) => void;
}

const useScrollableColumnHook = ({
  containerId,
  contentHeight,
  contentGap,
  maxDataLength,
  onScroll = (index: number, children: React.ReactNode[]) => {},
}: useScrollableColumnHookProps) => {
  const ref = useRef<any>(null);
  const [offset, setOffset] = useState<number>(0);

  const hasMounted = useRef(false);

  const scrollToTarget = useCallback(
    ({
      targetIndex = 0,
      useScroll = true,
    }: {
      targetIndex: number;
      useScroll?: boolean;
    }) => {
      const targetOffset = targetIndex * (contentHeight + contentGap);

      const spottableChildren = Spotlight.getSpottableDescendants(containerId);
      for (let i = 0; i < spottableChildren.length; i++) {
        const child = spottableChildren[i];

        if (!(child instanceof HTMLElement)) continue;

        if (i < targetIndex) {
          child.classList.add("hided");
        } else {
          child.classList.remove("hided");
        }
      }

      onScroll(targetIndex, spottableChildren);

      if (useScroll) {
        const el = document.getElementById(containerId);

        if (el instanceof HTMLElement) {
          el.style.transform = `translateX(-${targetOffset}px)`;
          setOffset(-targetOffset);
        }
      }
    },
    [containerId, contentHeight, contentGap, onScroll]
  );

  const onKeyDown = useCallback(
    (ev: React.KeyboardEvent, index: number) => {
      let targetIndex = 0;
      let useScroll = false;

      if (ev.key === ARROWRIGHT) {
        targetIndex = Math.min(index + 1, maxDataLength - 1);
        useScroll = true;
      } else if (ev.key === ARROWLEFT) {
        targetIndex = Math.max(index - 1, 0);
        useScroll = true;
      }

      if (useScroll) {
        scrollToTarget({ targetIndex: targetIndex });
      }
    },
    [maxDataLength, scrollToTarget]
  );

  const onKeyUp = useCallback(
    (ev: React.KeyboardEvent, index: number) => {
      if (ev.key === ARROWRIGHT || ev.key === ARROWLEFT) {
        scrollToTarget({ targetIndex: index });
      }
    },
    [scrollToTarget]
  );

  const onFocus = useCallback((ev: any) => {
    console.log(ev);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      scrollToTarget({ targetIndex: 0, useScroll: false });
    }
  }, [scrollToTarget]);

  return {
    ref: ref,
    offset: offset,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onFocus: onFocus,
    scrollToTarget: scrollToTarget,
  };
};

export const useScrollableColumn = useScrollableColumnHook;
