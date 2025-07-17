interface Theme {
  size: {
    gnbCollapsed: number;
    gnbExpanded: number;
  };
  zIndex: {
    gnb: number;
  };
}

export const theme: Theme = {
  size: {
    gnbCollapsed: 130,
    gnbExpanded: 400,
  },
  zIndex: {
    gnb: 1,
  },
};