import React, { useMemo } from "react";
import { DefaultTheme, useTheme } from "styled-components";

interface TextProps {
  children: React.ReactNode;
  textStyle?: keyof DefaultTheme["textStyle"];
  color?: string;
  maxLine?: number;
}

const Text = React.memo(
  ({ children, textStyle = "titleSmSb", color, maxLine = 1 }: TextProps) => {
    const theme = useTheme();

    const style = useMemo(() => {
      const baseStyle: React.CSSProperties = {
        fontFamily: "LGSmartUI",
        fontSize: theme.textStyle[textStyle].fontSize,
        fontWeight: theme.textStyle[textStyle].fontWeight,
        color: color ? color : theme.colors.text.primary,
        maxLines: maxLine,
      };

      return baseStyle;
    }, [theme, textStyle, color, maxLine]);

    return <div style={style}>{children}</div>;
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.textStyle === nextProps.textStyle &&
    prevProps.color === nextProps.color &&
    prevProps.maxLine === nextProps.maxLine
);

export default Text;
