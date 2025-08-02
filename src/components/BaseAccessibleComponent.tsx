import React, { useCallback, useMemo } from "react";

import { ItemDecorator } from "@enact/sandstone/Item";
import { translate } from "../utils/translate";

import useSpeak from "../hooks/useSpeak";
import useSpeakWhenFocusBlocked from "../hooks/useSpeakWhenFocusBlocked";
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
    const { speak } = useSpeak();

    const safeProps = useMemo(() => filterDOMProps(rest), [rest]);

    const speakerMessage = useMemo(() => {
      if (!speaker) return "";
      const baseMessage = translate(speaker);
      return disabled
        ? `${baseMessage} ${translate("common.deactivated")}`
        : baseMessage;
    }, [speaker, disabled]);

    const handleFocus = useCallback(
      (e: React.FocusEvent) => {
        onFocus?.(e);
        if (e.defaultPrevented) return;

        if (speakerMessage !== "") {
          speak(speakerMessage);
        }
      },
      [onFocus, speakerMessage, speak]
    );

    const handleKeyDown = useSpeakWhenFocusBlocked({ onKeyDown });

    return (
      <Component {...safeProps} onFocus={handleFocus} onKeyDown={handleKeyDown}>
        {children}
      </Component>
    );
  }
);

const BaseAccessibleComponent = ItemDecorator(BaseCard);

export default BaseAccessibleComponent;
