import React, { useCallback, useMemo } from "react";

import $L from "@enact/i18n/$L";
import { ItemDecorator } from "@enact/sandstone/Item";
import Spotlight from "@enact/spotlight";

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
      const baseMessage = $L(speaker);
      return disabled
        ? `${baseMessage} ${$L("common.deactivated")}`
        : baseMessage;
    }, [speaker, disabled]);

    const handleFocus = useCallback(
      (e: React.FocusEvent) => {
        onFocus?.(e);
        if (speakerMessage) {
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
          up: $L("common.screenAlreadyAtTop"),
          down: $L("common.screenAlreadyAtBottom"),
          left: $L("common.screenAlreadyAtVeryLeft"),
          right: $L("common.screenAlreadyAtVeryRight"),
        };

        const direction = directionMap[e.key as keyof typeof directionMap];
        if (direction) {
          const current = Spotlight.getCurrent();
          setTimeout(() => {
            const after = Spotlight.getCurrent();
            if (current === after) {
              speakIfAudioGuidanceOn({ text: directionMessages[direction] });
            }
          }, 10);
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
