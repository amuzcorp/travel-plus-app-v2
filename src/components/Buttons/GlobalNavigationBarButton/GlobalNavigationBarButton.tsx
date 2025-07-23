import BaseAccessibleComponent from "../../../components/Cards/BaseAccessibleComponent";
import React, { ReactNode, useMemo } from "react";
import styled from "styled-components";

import IGnbHome from "../../../../assets/icons/gnb/IGnbHome";
import IGnbSearch from "../../../../assets/icons/gnb/IGnbSearch";
import IGnbDestination from "../../../../assets/icons/gnb/IGnbDestination";
import IGnbLuggage from "../../../../assets/icons/gnb/IGnbLuggage";
import IGnbSettings from "../../../../assets/icons/gnb/IGnbSettings";
import IGnbExit from "../../../../assets/icons/gnb/IGnbExit";
import { Cell, CellProps, Row } from "@enact/ui/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store";
import { GnbState } from "../../../core/store/slices/gnbSlice";

interface GnbType {
  home: ElementOption;
  search: ElementOption;
  destination: ElementOption;
  luggage: ElementOption;
  settings: ElementOption;
  exit: ElementOption;
}

interface ElementOption {
  label: string;
  element: () => React.JSX.Element;
  useFill?: boolean;
}

const gnbTypeData: GnbType = {
  home: { label: "gnb.home", element: IGnbHome },
  search: { label: "gnb.search", element: IGnbSearch },
  destination: { label: "gnb.destination", element: IGnbDestination },
  luggage: { label: "gnb.luggage", element: IGnbLuggage, useFill: true },
  settings: { label: "gnb.settings", element: IGnbSettings, useFill: true },
  exit: { label: "gnb.exit", element: IGnbExit },
};

interface GlobalNavigationBarButtonProps {
  type: keyof GnbType;
  selected?: boolean;
}

export default React.memo(
  ({ type = "home", selected = false }: GlobalNavigationBarButtonProps) => {
    const Target = useMemo(() => {
      return gnbTypeData[type].element;
    }, [gnbTypeData, type]);

    const gnbState = useSelector(
      (state: RootState) => state.gnb.value
      // (prev, next) => true
    );

    return (
      <BaseAccessibleComponent component={GlobalNavigationChild}>
        {/* <div style={{ display: "block" }}>

        </div> */}
        <Target />
        <GlobalNavigationChildLabel $expanded={gnbState === GnbState.Expanded}>
          {gnbTypeData[type].label}
        </GlobalNavigationChildLabel>
      </BaseAccessibleComponent>
    );
  }
);

const GlobalNavigationChild = styled.button`
  all: unset;

  width: fit-content;
  height: calc(79 / 24 * 1rem);

  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    background: white;

    svg {
      fill: black;
    }
  }
`;

interface GlobalNavigationChildLabelProps {
  $expanded: boolean;
}

const GlobalNavigationChildLabel = styled.span<GlobalNavigationChildLabelProps>`
  display: ${({ $expanded }) => ($expanded ? "block" : "none")};
`;
