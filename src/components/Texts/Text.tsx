import React from 'react';
import { DefaultTheme, useTheme } from 'styled-components';

import Marquee from '@enact/sandstone/Marquee';

type MarqueeType = 'none' | 'focus' | 'render';

interface TextProps {
  children: React.ReactNode;
  textStyle?: keyof DefaultTheme['textStyle'];
  color?: string;
  marqueeType?: MarqueeType;
  active?: boolean;
  maxLine?: number;
}

const Text = ({
  children,
  color,
  textStyle = 'titleSmSb',
  marqueeType = 'render',
  active,
  maxLine = 1,
}: TextProps) => {
  const theme = useTheme();

  const style: React.CSSProperties = {
    fontSize: theme.textStyle[textStyle].fontSize,
    fontWeight: theme.textStyle[textStyle].fontWeight,
    color: color ? color : theme.colors.text.primary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  if (marqueeType === 'none') {
    if (maxLine === 1) {
      style.whiteSpace = 'nowrap';
    } else {
      style.display = '-webkit-box';
      style.WebkitLineClamp = maxLine;
      style.WebkitBoxOrient = 'vertical'; // webOS에서는 유효한 값
    }
  }

  // 최종 marquee 여부 결정
  const marqueeOn: 'render' | undefined =
    marqueeType === 'render' || (marqueeType === 'focus' && active) ? 'render' : undefined;

  return (
    <Marquee marqueeOn={marqueeOn} style={style}>
      {children}
    </Marquee>
  );
};

export default Text;
