import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import {
  GnbBottomSections,
  gnbContainerKeys,
  GnbMiddleSections,
  GnbTopSections,
} from "../../constants/globalConstant";

import { RootState } from "../../store";
import GlobalNavigationBarButton, {
  GnbType,
} from "../Buttons/GlobalNavigationBarButton/GlobalNavigationBarButton";
import {
  GNBOverlay,
  GNBWrapper,
  SectionWrapper,
  SpotlightContainer,
} from "./GlobalNavigationBar.style";
import { useGlobalNavigationBar } from "./useGlobalNavigationBar";

const GlobalNavigationBar: React.FC = React.memo(() => {
  const selectedButton = useSelector(
    (state: RootState) => state.gnb.selectedButton,
    (prev, next) => prev === next
  );

  const { expanded, expandGnb, collapseGnb } = useGlobalNavigationBar();

  const GNBOverlayProps = useMemo(() => {
    return {
      className: `${expanded ? "expanded" : ""}`,
    };
  }, [expanded]);

  const GNBWrapperProps = useMemo(() => {
    return {
      className: `${expanded ? "expanded" : ""}`,
      onMouseEnter: expandGnb,
      onMouseLeave: collapseGnb,
    };
  }, [expanded, expandGnb, collapseGnb]);


  const generateButton = useCallback(
    (typeValue: keyof GnbType, isLast: boolean) => {
      const id = "gnb-menu-" + typeValue;

      return (
        <GlobalNavigationBarButton
          id={id}
          spotlightId={id}
          key={id}
          type={typeValue}
          marginBottom={!isLast ? 20 : 0}
          selected={typeValue === selectedButton}
        />
      );
    },
    [selectedButton]
  );

  const topSection = useMemo(() => {
    return GnbTopSections.map((value, index) =>
      generateButton(
        value as keyof GnbType,
        index === GnbTopSections.length - 1
      )
    );
  }, [generateButton]);

  const middleSection = useMemo(() => {
    return GnbMiddleSections.map((value, index) => {
      return generateButton(
        value as keyof GnbType,
        index === GnbMiddleSections.length - 1
      );
    });
  }, [generateButton]);

  const bottomSection = useMemo(() => {
    return GnbBottomSections.map((value, index) => {
      return generateButton(
        value as keyof GnbType,
        index === GnbBottomSections.length - 1
      );
    });
  }, [generateButton]);

  return (
    <SpotlightContainer
      spotlightId={gnbContainerKeys.gnb}
      spotlightRestrict="self-only"
    >
      <GNBOverlay {...GNBOverlayProps} />
      <GNBWrapper {...GNBWrapperProps}>
        <SectionWrapper>{topSection}</SectionWrapper>

        <SectionWrapper>{middleSection}</SectionWrapper>

        <SectionWrapper>{bottomSection}</SectionWrapper>
      </GNBWrapper>
    </SpotlightContainer>
  );
});

export default GlobalNavigationBar;
