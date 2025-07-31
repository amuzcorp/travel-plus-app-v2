import { useCallback } from "react";

import Spotlight from "@enact/spotlight";

import { translate } from "../utils/translate";
import useSpeak from "./useSpeak";

// 이동할 수 없는 방향으로 포커스 이동을 시도할 때 음성 안내
type DirectionKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

interface Options {
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function useSpeakWhenFocusBlocked({ onKeyDown }: Options = {}) {
  const { speak } = useSpeak();

  return useCallback(
    (e: React.KeyboardEvent) => {
      onKeyDown?.(e);
      if (e.defaultPrevented || e.repeat) return;

      const key = e.key as DirectionKey;

      if (
        key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "ArrowLeft" ||
        key === "ArrowRight"
      ) {
        const current = Spotlight.getCurrent();
        requestAnimationFrame(() => {
          const after = Spotlight.getCurrent();
          if (current === after) {
            const message = {
              ArrowUp: translate("common.screenAlreadyAtTop"),
              ArrowDown: translate("common.screenAlreadyAtBottom"),
              ArrowLeft: translate("common.screenAlreadyAtVeryLeft"),
              ArrowRight: translate("common.screenAlreadyAtVeryRight"),
            }[key];
            if (message) speak(message);
          }
        });
      }
    },
    [onKeyDown, speak]
  );
}
