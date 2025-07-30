export const appId = "com.lgtravel.app";

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

export const homeContainerKeys = {
  carousel: "home-carousel-container",
  city: "home-city-container",
  favorite: "home-favorite-container",
};

export const contentCardWidth = 403;
export const contentCardGap = 24;

export const cityCardWidth = 1031;
export const cityCardSmallWidth = 470;
export const cityCardHeight = 705;
export const cityCardGap = 24;

export const countryCardWidth = 220;
export const countryCardHeight = 220;
export const countryCardGap = 24;
