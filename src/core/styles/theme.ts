import { DefaultTheme } from 'styled-components/dist/types';

export const theme: DefaultTheme = {
  size: {
    gnbCollapsed: 130,
    gnbExpanded: 400,
  },
  zIndex: {
    gnb: 1,
  },
  colors: {
    keyColor: {
      main: '#00FFCC',
      item: '#00A584',
      new: '#008A83',
      mid: '#008F88',
      deep: '#003633',
    },
    point: {
      badge: '#FF5454',
      hot: '#BF4658',
    },
    deactive: {
      normal: 'rgba(230, 230, 230, 0.3)',
      focused: 'rgba(76, 80, 89, 0.4)',
    },
    text: {
      primary: '#E6E6E6',
      primaryVari: '#2E3239',
      tertiary: '#C7C8CC',
      secondary: '#ABAEB3',
      icon: '#8D9298',
      secondaryVari: '#858B92',
      focused: '#4C5059',
    },
    background: {
      imagery: '#4B5157',
      popup: '#373A41',
      imageryVari: '#1F2226',
      black: '#000000',
    },
  },
  textStyle: {
    headerHugeSb: {
      fontSize: '72px',
      fontWeight: 600,
    },
    headerXlSb: {
      fontSize: '54px',
      fontWeight: 600,
    },
    headerLgSb: {
      fontSize: '45px',
      fontWeight: 600,
    },
    headerMdSb: {
      fontSize: '36px',
      fontWeight: 600,
    },
    headerMdRg: {
      fontSize: '36px',
      fontWeight: 400,
    },
    headerSmSb: {
      fontSize: '33px',
      fontWeight: 600,
    },
    headerSmRg: {
      fontSize: '33px',
      fontWeight: 400,
    },
    titleXlSb: {
      fontSize: '36px',
      fontWeight: 600,
    },
    titleXlRg: {
      fontSize: '36px',
      fontWeight: 400,
    },
    titleLgSb: {
      fontSize: '33px',
      fontWeight: 600,
    },
    titleLgRg: {
      fontSize: '33px',
      fontWeight: 400,
    },
    titleMdSb: {
      fontSize: '30px',
      fontWeight: 600,
    },
    titleMdRg: {
      fontSize: '30px',
      fontWeight: 400,
    },
    titleSmSb: {
      fontSize: '27px',
      fontWeight: 600,
    },
    titleSmRg: {
      fontSize: '27px',
      fontWeight: 400,
    },
    titleTinySb: {
      fontSize: '24px',
      fontWeight: 600,
    },
    titleTinyRg: {
      fontSize: '24px',
      fontWeight: 400,
    },
    bodyMdRg: {
      fontSize: '30px',
      fontWeight: 400,
    },
    bodySmSb: {
      fontSize: '24px',
      fontWeight: 600,
    },
    bodyTinySb: {
      fontSize: '21px',
      fontWeight: 600,
    },
    bodyTinyRg: {
      fontSize: '21px',
      fontWeight: 400,
    },
  },
};
