import React, { useMemo } from "react";

import Marquee from "@enact/sandstone/Marquee";
import { DefaultTheme, useTheme } from "styled-components";

interface MarqueeTextProps {
  children: React.ReactNode;
  textStyle?: keyof DefaultTheme["textStyle"];
  color?: string;
  lineHeight?: string | number;
}

const MarqueeText = React.memo(
  ({
    children,
    color,
    textStyle = "titleSmSb",
    lineHeight = "normal",
  }: MarqueeTextProps) => {
    const theme = useTheme();

    const style = useMemo(() => {
      const baseStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        height: theme.textStyle[textStyle].fontSize,
        fontFamily: "LGSmartUI",
        fontSize: theme.textStyle[textStyle].fontSize,
        fontWeight: theme.textStyle[textStyle].fontWeight,
        color: color ?? theme.colors.text.primary,
        lineHeight,
      };

      return baseStyle;
    }, [theme, textStyle, color, lineHeight]);

    return (
      <Marquee marqueeOn={"render"} style={style}>
        {children}
      </Marquee>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.textStyle === nextProps.textStyle &&
    prevProps.color === nextProps.color
);

export default MarqueeText;
