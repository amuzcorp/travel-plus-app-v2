import React, { useCallback, useMemo } from "react";

import { ItemDecorator } from "@enact/sandstone/Item";
import Spotlight from "@enact/spotlight";
import { translate } from "../utils/translate";

import { speakIfAudioGuidanceOn } from "../utils/audioGuidance";
import { filterDOMProps } from "../utils/filterDOMProps";

interface BaseCardProps {
  children: React.ReactNode;
  component?: React.ElementType;
  speaker?: string;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  [key: string]: any;
}

const BaseCard = React.memo(
  ({
    children,
    component: Component = "div",
    speaker,
    disabled,
    onFocus,
    onKeyDown,
    ...rest
  }: BaseCardProps) => {
    const safeProps = useMemo(() => filterDOMProps(rest), [rest]);

    const speakerMessage = useMemo(() => {
      if (!speaker) return "";
      const baseMessage = translate(speaker);
      return disabled ? `${baseMessage} ${translate("common.deactivated")}` : baseMessage;
    }, [speaker, disabled]);

    const handleFocus = useCallback(
      (e: React.FocusEvent) => {
        onFocus?.(e);
        if (speakerMessage !== "") {
          speakIfAudioGuidanceOn({ text: speakerMessage });
        }
      },
      [onFocus, speakerMessage]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        onKeyDown?.(e);

        const directionMap = {
          ArrowUp: "up",
          ArrowDown: "down",
          ArrowLeft: "left",
          ArrowRight: "right",
        } as const;

        const directionMessages = {
          up: translate("common.screenAlreadyAtTop"),
          down: translate("common.screenAlreadyAtBottom"),
          left: translate("common.screenAlreadyAtVeryLeft"),
          right: translate("common.screenAlreadyAtVeryRight"),
        };

        const direction = directionMap[e.key as keyof typeof directionMap];
        if (direction) {
          const current = Spotlight.getCurrent();

          // requestAnimationFrame을 사용하여 다음 프레임에서 비교
          requestAnimationFrame(() => {
            const after = Spotlight.getCurrent();
            if (current === after) {
              speakIfAudioGuidanceOn({ text: directionMessages[direction] });
            }
          });
        }
      },
      [onKeyDown]
    );

    return (
      <Component {...safeProps} onFocus={handleFocus} onKeyDown={handleKeyDown}>
        {children}
      </Component>
    );
  }
);

const BaseAccessibleComponent = ItemDecorator(BaseCard);

export default BaseAccessibleComponent;
