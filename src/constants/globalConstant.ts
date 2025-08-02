export const appId = "com.lgtravel.app";

/// 실제 데이터를 사용할 경우 해당 변수를 false로 변경
export const useFakeData = true;

export const zIndexes = [
  "normal",
  "header",
  "gnb",
  "popup",
  "spinner",
] as const;

export const localStorageLanguageCode = {
  key: "languageCode",
};

export const localStorageVisited = {
  key: "hasVisited",
  value: "you visited",
};

export const GnbTopSections = ["account"];
export const GnbMiddleSections = ["home", "search", "destination", "luggage"];
export const GnbBottomSections = ["settings", "exit"];

export const gnbContainerKeys = {
  gnb: "gnb-container",
};

export const homeKeys: Record<string, keyInfo> = {
  carousel: {
    sectionKey: "home-carousel-section",
    containerKey: "home-carousel-container",
    defaultKey: "home-carousel-row-travel-now",
  },
  city: {
    sectionKey: "home-city-section",
    containerKey: "home-city-container",
  },
  favorite: {
    sectionKey: "home-favorite-section",
    containerKey: "home-favorite-container",
  },
  deals: {
    sectionKey: "home-deals-section",
    containerKey: "home-deals-container",
  },
};
export type HomeSectionTypes = keyof typeof homeKeys;
export const HomeSectionOrder = Object.keys(homeKeys) as HomeSectionTypes[];

export interface keyInfo {
  sectionKey: string;
  containerKey: string;
  defaultKey?: string;
}

export const cityRowItemKey = "city";
export const ottRowItemKey = "ott";
export const contentRowItemKey = "content";
export const adsRowItemKey = "ads";
export const countryRowItemKey = "country";
export const carouselRowItemKey = "banner";

export const contentCardWidth = 403;
export const contentCardHeight = 227;
export const contentCardGap = 24;

export const cityCardWidth = 1031;
export const cityCardSmallWidth = 470;
export const cityCardHeight = 705;
export const cityCardGap = 24;

export const countryCardWidth = 220;
export const countryCardHeight = 220;
export const countryCardGap = 24;
