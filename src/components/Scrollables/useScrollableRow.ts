import Spotlight from "@enact/spotlight";
import React, { useCallback, useEffect, useRef, useState } from "react";

const ARROWRIGHT = "ArrowRight";
const ARROWLEFT = "ArrowLeft";

export interface ScrollToTargetProps {
  targetIndex: number;
  useScroll?: boolean;
}

export interface UseScrollableRowResult {
  ref: React.RefObject<any>;
  offset: number;
  onKeyDown: (ev: React.KeyboardEvent, index: number) => number;
  onKeyUp: (ev: React.KeyboardEvent, index: number) => void;
  onFocus: (ev: any, index: number) => void;
  scrollToTarget: ({ targetIndex, useScroll }: ScrollToTargetProps) => void;
}

export interface UseScrollableRowHookProps {
  containerId: string;
  contentWidth: number;
  contentGap: number;
  maxDataLength: number;
  useScrollToEnd?: boolean;
  onScroll?: (index: number, children: React.ReactNode[]) => void;
}

const useScrollableRowHook = ({
  containerId,
  contentWidth,
  contentGap,
  maxDataLength,
  useScrollToEnd = true,
  onScroll = (index: number, children: React.ReactNode[]) => {},
}: UseScrollableRowHookProps): UseScrollableRowResult => {
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
      let targetOffset = targetIndex * (contentWidth + contentGap);
      let hideIndex = targetIndex;

      const container = document.getElementById(containerId);

      if (!useScrollToEnd) {
        const scrollContentWidth = container?.scrollWidth ?? 0;
        const containerWidth = window.innerWidth;
        const tempWidth = Math.max(scrollContentWidth - containerWidth, 0);

        for (let i = targetIndex; i >= 0; i--) {
          const tempOffset = i * (contentWidth + contentGap);

          if (tempOffset > tempWidth) {
            hideIndex = i;
            targetOffset = tempOffset;
          }
        }
      }

      const spottableChildren = Spotlight.getSpottableDescendants(containerId);
      for (let i = 0; i < spottableChildren.length; i++) {
        const child = spottableChildren[i];

        if (!(child instanceof HTMLElement)) continue;

        if (i < hideIndex) {
          child.classList.add("hided");
        } else {
          child.classList.remove("hided");
        }
      }

      onScroll(hideIndex, spottableChildren);

      if (useScroll) {
        const el = document.getElementById(containerId);

        if (el instanceof HTMLElement) {
          el.style.transform = `translateX(-${targetOffset}px)`;
          setOffset(-targetOffset);
        }
      }
    },
    [containerId, contentWidth, contentGap, onScroll, useScrollToEnd]
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
        return targetIndex;
      }

      return -1;
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

  const onFocus = useCallback((ev: any) => {}, []);

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

export const useScrollableRow = useScrollableRowHook;
