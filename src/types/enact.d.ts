import React from "react";

declare module "@enact/ui/Layout" {
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
declare module "@enact/spotlight/SpotlightContainerDecorator" {
  interface SpotlightContainerDecoratorProps {
    children?: React.ReactNode;
  }
}

// styled-components 테마 타입 확장
declare module "styled-components" {
  export interface DefaultTheme {
    size: {
      gnbCollapsed: number;
      gnbExpanded: number;
    };
    zIndex: {
      gnb: number;
    };
    colors: {
      keyColor: {
        main: string;
        item: string;
        new: string;
        mid: string;
        deep: string;
      };
      point: {
        badge: string;
        hot: string;
      };
      deactive: {
        normal: string;
        focused: string;
      };
      text: {
        primary: string;
        primaryVari: string;
        tertiary: string;
        secondary: string;
        secondaryVari: string;
        icon: string;
        focused: string;
      };
      background: {
        imagery: string;
        imageryVari: string;
        popup: string;
        black: string;
      };
    };
    textStyle: {
      headerHugeSb: {
        fontSize: string;
        fontWeight: number;
      };
      headerXlSb: {
        fontSize: string;
        fontWeight: number;
      };
      headerLgSb: {
        fontSize: string;
        fontWeight: number;
      };
      headerMdSb: {
        fontSize: string;
        fontWeight: number;
      };
      headerMdRg: {
        fontSize: string;
        fontWeight: number;
      };
      headerSmSb: {
        fontSize: string;
        fontWeight: number;
      };
      headerSmRg: {
        fontSize: string;
        fontWeight: number;
      };
      titleXlSb: {
        fontSize: string;
        fontWeight: number;
      };
      titleXlRg: {
        fontSize: string;
        fontWeight: number;
      };
      titleLgSb: {
        fontSize: string;
        fontWeight: number;
      };
      titleLgRg: {
        fontSize: string;
        fontWeight: number;
      };
      titleMdSb: {
        fontSize: string;
        fontWeight: number;
      };
      titleMdRg: {
        fontSize: string;
        fontWeight: number;
      };
      titleSmSb: {
        fontSize: string;
        fontWeight: number;
      };
      titleSmRg: {
        fontSize: string;
        fontWeight: number;
      };
      titleTinySb: {
        fontSize: string;
        fontWeight: number;
      };
      titleTinyRg: {
        fontSize: string;
        fontWeight: number;
      };
      bodyMdRg: {
        fontSize: string;
        fontWeight: number;
      };
      bodySmSb: {
        fontSize: string;
        fontWeight: number;
      };
      bodyTinySb: {
        fontSize: string;
        fontWeight: number;
      };
      bodyTinyRg: {
        fontSize: string;
        fontWeight: number;
      };
    };
  }
}
