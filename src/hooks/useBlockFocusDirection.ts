import { useCallback } from "react";

import { translate } from "../utils/translate";
import useSpeak from "./useSpeak";

// 막고 싶은 이동 방향
type DirectionKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

interface Options {
  blockDirections: DirectionKey[];
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function useBlockFocusDirection({
  blockDirections,
  onKeyDown,
}: Options) {
  const { speak } = useSpeak();

  return useCallback(
    (e: React.KeyboardEvent) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      if (blockDirections.includes(e.key as DirectionKey)) {
        e.preventDefault();
        e.stopPropagation();

        const message = {
          ArrowUp: translate("common.screenAlreadyAtTop"),
          ArrowDown: translate("common.screenAlreadyAtBottom"),
          ArrowLeft: translate("common.screenAlreadyAtVeryLeft"),
          ArrowRight: translate("common.screenAlreadyAtVeryRight"),
        }[e.key as DirectionKey];

        speak(message);
      }
    },
    [blockDirections, onKeyDown, speak]
  );
}
