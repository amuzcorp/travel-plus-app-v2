import Spotlight from "@enact/spotlight";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { homeKeys, HomeSectionTypes } from "../../constants/globalConstant";
import { getNextSection, getPrevSection } from "../../store/slices/homeSlice";

export interface UseHomePageScrollProps {
  currentSection: HomeSectionTypes;
}
export type HomeScrollPostionTypes = "start" | "center" | "end" | number;

export interface UseHomePageScrollResult {
  prevSection: HomeSectionTypes | null;
  currentSection: HomeSectionTypes;
  nextSection: HomeSectionTypes | null;
  homeScrollTo: (
    currentSection: HomeSectionTypes | null,
    scrollPosition: HomeScrollPostionTypes
  ) => void;
}

const useHomePageScrollHook = ({
  currentSection,
}: UseHomePageScrollProps): UseHomePageScrollResult => {
  const prevSection = useSelector((state: RootState) =>
    getPrevSection(state, currentSection)
  );
  const nextSection = useSelector((state: RootState) =>
    getNextSection(state, currentSection)
  );

  const homeScrollTo = useCallback(
    (
      section: HomeSectionTypes | null,
      scrollPosition: HomeScrollPostionTypes
    ) => {
      if (section === null) {
        return;
      }

      const parent = document.getElementById("home-main-container");

      const targetSection = homeKeys[section];

      const child = document.getElementById(targetSection.sectionKey);

      if (parent instanceof HTMLElement && child instanceof HTMLElement) {
        child.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });

        const key = targetSection.defaultKey ?? targetSection.containerKey;

        Spotlight.setPointerMode(false);

        Spotlight.focus(key, {
          preventScroll: true,
        });
      }
    },
    []
  );

  return {
    prevSection: prevSection,
    currentSection: currentSection,
    nextSection: nextSection,
    homeScrollTo: homeScrollTo,
  };
};

export const useHomePageSroll = useHomePageScrollHook;
