import Spotlight from "@enact/spotlight";
import { useCallback, useState } from "react";
import { homeKeys } from "../../core/constants/globalConstant";

export interface UseHomePageScrollProps {}

export type homeSectionType = (typeof homeKeys)[keyof typeof homeKeys];

export type homeScrollPositionType = "start" | "center" | "end" | number;
export interface UseHomePageScrollResult {
  currentSection: homeSectionType;
  homeScrollTo: (
    section: homeSectionType,
    scrollPosition: homeScrollPositionType
  ) => void;
}

const useHomePageScrollHook = (): UseHomePageScrollResult => {
  const [currentSection, setCurrentSection] = useState<homeSectionType>(
    homeKeys.carousel
  );

  const homeScrollTo = useCallback(
    (section: homeSectionType, scrollPosition: homeScrollPositionType) => {
      // Spotlight.setActiveContainer(section.containerKey);

      // const el = document.getElementById('home-main-container');

      // if(el instanceof HTMLElement) {

      // }

      const parent = document.getElementById("home-main-container");
      const child = document.getElementById(section.sectionKey);

      if (parent instanceof HTMLElement && child instanceof HTMLElement) {
        child.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });

        const key = section.defaultKey ?? section.containerKey;

        console.log(key);
        // console.log(
        Spotlight.focus(key, {
          preventScroll: true,
        });
        // );
      }
    },
    []
  );

  return {
    currentSection: currentSection,
    homeScrollTo: homeScrollTo,
  };
};

export const useHomePageSroll = useHomePageScrollHook;
