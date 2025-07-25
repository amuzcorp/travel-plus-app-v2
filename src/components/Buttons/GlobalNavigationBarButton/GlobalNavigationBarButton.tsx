import React, { useEffect, useState } from "react";
import BaseAccessibleComponent from "../../../components/BaseAccessibleComponent";

import IGnbHome from "../../../../assets/icons/gnb/IGnbHome";
import IGnbHomeSelected from "../../../../assets/icons/gnb/IGnbHomeSelected";

import IGnbSearch from "../../../../assets/icons/gnb/IGnbSearch";
import IGnbSearchSelected from "../../../../assets/icons/gnb/IGnbSearchSelected";

import IGnbDestination from "../../../../assets/icons/gnb/IGnbDestination";
import IGnbDestinationSelected from "../../../../assets/icons/gnb/IGnbDestinationSelected";

import IGnbLuggage from "../../../../assets/icons/gnb/IGnbLuggage";
import IGnbLuggageSelected from "../../../../assets/icons/gnb/IGnbLuggageSelected";

import IGnbSettings from "../../../../assets/icons/gnb/IGnbSettings";
import IGnbSettingsSelected from "../../../../assets/icons/gnb/IGnbSettingsSelected";

import IGnbExit from "../../../../assets/icons/gnb/IGnbExit";
import IGnbExitSelected from "../../../../assets/icons/gnb/IGnbExitSelected";

import $L from "@enact/i18n/$L";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { GnbState } from "../../../core/store/slices/gnbSlice";
import {
  GlobalNavigationChild,
  GlobalNavigationChildIcon,
  GlobalNavigationChildLabel,
  IconWrapper,
} from "./GlobalNavigationBarButton.style";

export interface GnbType {
  home: ElementOption;
  search: ElementOption;
  destination: ElementOption;
  luggage: ElementOption;
  settings: ElementOption;
  exit: ElementOption;
}

interface ElementOption {
  label: string;
  element: React.MemoExoticComponent<() => React.JSX.Element>;
  selectedElement: React.MemoExoticComponent<() => React.JSX.Element>;
}

export const gnbTypeData: GnbType = {
  home: {
    label: "navigation.home",
    element: IGnbHome,
    selectedElement: IGnbHomeSelected,
  },
  search: {
    label: "navigation.search",
    element: IGnbSearch,
    selectedElement: IGnbSearchSelected,
  },
  destination: {
    label: "navigation.destinations",
    element: IGnbDestination,
    selectedElement: IGnbDestinationSelected,
  },
  luggage: {
    label: "navigation.myLuggage",
    element: IGnbLuggage,
    selectedElement: IGnbLuggageSelected,
  },
  settings: {
    label: "navigation.settings",
    element: IGnbSettings,
    selectedElement: IGnbSettingsSelected,
  },
  exit: {
    label: "navigation.exitApp",
    element: IGnbExit,
    selectedElement: IGnbExitSelected,
  },
};

interface GlobalNavigationBarButtonProps {
  type: keyof GnbType;
  selected?: boolean;
  marginBottom?: number;
  onClick?: Function;
}

export default React.memo(
  ({
    type = "home",
    selected = false,
    marginBottom,
    onClick = () => {},
  }: GlobalNavigationBarButtonProps) => {
    /// 기본 상태
    const Idle = gnbTypeData[type].element;

    /// 선택되었을 때
    const Focused = gnbTypeData[type].selectedElement;

    const gnbState = useSelector(
      (state: RootState) => state.gnb.value,
      (prev, next) => prev === next
    );
    const [expanded, setExpand] = useState(false);

    useEffect(() => {
      setExpand(gnbState === GnbState.Expanded);
    }, [gnbState]);

    const Icon = React.memo(() => {
      return (
        <GlobalNavigationChildIcon className="icon">
          <IconWrapper className="idle">
            <Idle />
          </IconWrapper>
          <IconWrapper className="focused">
            <Focused />
          </IconWrapper>
        </GlobalNavigationChildIcon>
      );
    });

    const Label = React.memo(() => {
      return (
        <GlobalNavigationChildLabel className="label">
          {$L(gnbTypeData[type].label)}
        </GlobalNavigationChildLabel>
      );
    });

    return (
      <BaseAccessibleComponent
        component={GlobalNavigationChild}
        className={`${selected ? "selected" : ""} ${expanded ? "expanded" : ""}`}
        onClick={onClick}
        $marginBottom={marginBottom}
        data-spot-id={type}
      >
        <Icon />
        <Label />
      </BaseAccessibleComponent>
    );
  },
  (prev, next) => {
    return prev.selected === next.selected && prev.type === next.type;
  }
);
