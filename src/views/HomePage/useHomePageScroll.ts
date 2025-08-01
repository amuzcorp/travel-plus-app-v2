import Spotlight from "@enact/spotlight";
import { useCallback, useState } from "react";
import { homeKeys } from "../../constants/globalConstant";

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
      const parent = document.getElementById("home-main-container");
      const child = document.getElementById(section.sectionKey);

      if (parent instanceof HTMLElement && child instanceof HTMLElement) {
        setCurrentSection(section);

        child.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });

        const key = section.defaultKey ?? section.containerKey;

        Spotlight.setPointerMode(false);

        Spotlight.focus(key, {
          preventScroll: true,
        });
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
