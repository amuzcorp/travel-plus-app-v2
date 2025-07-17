import React from 'react';

declare module '@enact/ui/Layout' {
  interface RowProps {
    children?: React.ReactNode;
  }

  interface ColumnProps {
    children?: React.ReactNode;
  }

  interface CellProps {
    children?: React.ReactNode;
  }

  interface LayoutProps {
    children?: React.ReactNode;
  }
}

// Spotlight 타입 확장
declare module '@enact/spotlight/SpotlightContainerDecorator' {
  interface SpotlightContainerDecoratorProps {
    children?: React.ReactNode;
  }
}

// styled-components 테마 타입 확장
declare module 'styled-components' {
  export interface DefaultTheme {
    size: {
      gnbCollapsed: number;
      gnbExpanded: number;
    };
    zIndex: {
      gnb: number;
    };
  }
}