import React, { useMemo } from "react";
import { DefaultTheme, useTheme } from "styled-components";

interface TextProps {
  children: React.ReactNode;
  textStyle?: keyof DefaultTheme["textStyle"];
  color?: string;
  maxLine?: number;
  lineHeight?: string | number;
}

const Text = React.memo(
  ({ children, textStyle = "titleSmSb", color, maxLine = 1, lineHeight = "normal" }: TextProps) => {
    const theme = useTheme();

    const style = useMemo(() => {
      const baseStyle: React.CSSProperties = {
        fontFamily: "LGSmartUI",
        fontSize: theme.textStyle[textStyle].fontSize,
        fontWeight: theme.textStyle[textStyle].fontWeight,
        color: color ?? theme.colors.text.primary,
        lineHeight,
        display: maxLine > 1 ? "-webkit-box" : "block",
        WebkitLineClamp: maxLine > 1 ? maxLine : undefined,
        WebkitBoxOrient: maxLine > 1 ? "vertical" : undefined,
        overflow: maxLine > 1 ? "hidden" : undefined,
      };

      return baseStyle;
    }, [theme, textStyle, color, maxLine, lineHeight]);

    return <div style={style}>{children}</div>;
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.textStyle === nextProps.textStyle &&
    prevProps.color === nextProps.color &&
    prevProps.maxLine === nextProps.maxLine
);

export default Text;
