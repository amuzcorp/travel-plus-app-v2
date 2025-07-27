import { useCallback } from "react";
import { speak } from "../utils/audioGuidance";
import { translate } from "../utils/translate";

type DirectionKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

interface Options {
  blockDirections: DirectionKey[];
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function useBlockFocusDirection({
  blockDirections,
  onKeyDown,
}: Options) {
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
    [blockDirections, onKeyDown]
  );
}
