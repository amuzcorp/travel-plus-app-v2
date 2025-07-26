import React, { useMemo } from "react";
import { DefaultTheme, useTheme } from "styled-components";

interface TextProps {
  children: React.ReactNode;
  textStyle?: keyof DefaultTheme["textStyle"];
  color?: string;
  maxLine?: number;
  lineHeight?: string | number;
  wordBreak?: "normal" | "break-all" | "keep-all" | "break-word";
}

const Text = React.memo(
  ({
    children,
    textStyle = "titleSmSb",
    color,
    maxLine = 1,
    lineHeight = "normal",
    wordBreak = "break-word",
    ...rest
  }: TextProps) => {
    const theme = useTheme();

    const hasMaxLine = maxLine >= 1;

    const style = useMemo(() => {
      const baseStyle: React.CSSProperties = {
        fontFamily: "LGSmartUI",
        fontSize: theme.textStyle[textStyle].fontSize,
        fontWeight: theme.textStyle[textStyle].fontWeight,
        color: color ?? theme.colors.text.primary,
        lineHeight,

        wordBreak,
        ...(hasMaxLine && {
          display: "-webkit-box",
          WebkitLineClamp: maxLine,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }),
      };

      return baseStyle;
    }, [theme, textStyle, color, maxLine, lineHeight, hasMaxLine, wordBreak]);

    return (
      <div style={style} {...rest}>
        {children}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.textStyle === nextProps.textStyle &&
    prevProps.color === nextProps.color &&
    prevProps.maxLine === nextProps.maxLine
);

export default Text;
