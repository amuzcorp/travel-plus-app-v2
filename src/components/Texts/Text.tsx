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
        color: color
          ? color
          : active
          ? theme.colors.text.primaryVari
          : theme.colors.text.primary,
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
    }, [theme, textStyle, color, marqueeType, maxLine, active]);
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
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.textStyle === nextProps.textStyle &&
    prevProps.color === nextProps.color &&
    prevProps.marqueeType === nextProps.marqueeType &&
    prevProps.active === nextProps.active &&
    prevProps.maxLine === nextProps.maxLine
);

export default Text;
