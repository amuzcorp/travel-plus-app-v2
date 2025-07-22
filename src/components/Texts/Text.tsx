import Marquee from "@enact/sandstone/Marquee";
import React, { useMemo } from "react";
import { DefaultTheme, useTheme } from "styled-components";

type MarqueeType = "none" | "focus" | "render";

interface TextProps {
  children: React.ReactNode;
  textStyle?: keyof DefaultTheme["textStyle"];
  color?: string;
  marqueeType?: MarqueeType;
  active?: boolean;
  maxLine?: number;
}

const Text = React.memo(
  ({
    children,
    color,
    textStyle = "titleSmSb",
    marqueeType = "render",
    active,
    maxLine = 1,
  }: TextProps) => {
    const theme = useTheme();

    const style = useMemo(() => {
      const baseStyle: React.CSSProperties = {
        fontSize: theme.textStyle[textStyle].fontSize,
        fontWeight: theme.textStyle[textStyle].fontWeight,
        color: color ?? theme.colors.text.primary,
        overflow: "hidden",
        textOverflow: "ellipsis",
      };

      if (marqueeType === "none") {
        if (maxLine === 1) {
          baseStyle.whiteSpace = "nowrap";
        } else {
          baseStyle.display = "-webkit-box";
          baseStyle.WebkitLineClamp = maxLine;
          baseStyle.WebkitBoxOrient = "vertical";
        }
      }

      return baseStyle;
    }, [theme, textStyle, color, marqueeType, maxLine]);

    const marqueeOn = useMemo(() => {
      return marqueeType === "render" || (marqueeType === "focus" && active)
        ? "render"
        : undefined;
    }, [marqueeType, active]);

    return (
      <Marquee marqueeOn={marqueeOn} style={style}>
        {children}
      </Marquee>
    );
  },
  (prevProps, nextProps) => prevProps.active === nextProps.active
);

export default Text;
