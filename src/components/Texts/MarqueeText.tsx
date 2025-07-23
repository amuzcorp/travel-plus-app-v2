import Marquee from "@enact/sandstone/Marquee";
import React, { useMemo } from "react";
import { DefaultTheme, useTheme } from "styled-components";

interface MarqueeTextProps {
  children: React.ReactNode;
  textStyle?: keyof DefaultTheme["textStyle"];
  color?: string;
}

const MarqueeText = React.memo(
  ({ children, color, textStyle = "titleSmSb" }: MarqueeTextProps) => {
    const theme = useTheme();

    const style = useMemo(() => {
      const baseStyle: React.CSSProperties = {
        fontSize: theme.textStyle[textStyle].fontSize,
        fontWeight: theme.textStyle[textStyle].fontWeight,
        color: color ? color : theme.colors.text.primary,
      };

      return baseStyle;
    }, [theme, textStyle, color]);

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
