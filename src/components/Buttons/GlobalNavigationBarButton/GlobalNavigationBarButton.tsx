import BaseAccessibleComponent from "../../../components/Cards/BaseAccessibleComponent";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store";
import { GnbState } from "../../../core/store/slices/gnbSlice";
import $L from "@enact/i18n/$L";

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

const gnbTypeData: GnbType = {
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
        className={`${selected ? "selected" : ""} ${
          expanded ? "expanded" : ""
        }`}
        onClick={onClick}
        $marginBottom={marginBottom}
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

interface GlobalNavigationChildProps {
  $marginBottom?: number;
}
const GlobalNavigationChild = styled.button<GlobalNavigationChildProps>`
  all: unset;

  width: calc(100% - 13 / 24 * 1rem);
  height: calc(79 / 24 * 1rem);

  padding: 0 calc(6.5 / 24 * 1rem);
  ${({ $marginBottom }) =>
    $marginBottom &&
    `
    margin-bottom: calc(${$marginBottom} / 24 * 1rem);
  `};

  display: flex;
  justify-content: start;
  align-items: center;

  border-radius: calc(12 / 24 * 1rem);

  overflow: hidden;

  &:focus {
    background: ${({ theme }) => theme.colors.text.primary};
    color: ${({ theme }) => theme.colors.text.primaryVari};

    .icon {
      path {
        fill: ${({ theme }) => theme.colors.text.primaryVari};
      }

      .idle {
        opacity: 0;
      }
      .focused {
        opacity: 1;
      }
    }
  }

  &.selected {
    color: ${({ theme }) => theme.colors.keyColor.item};

    .icon {
      background: rgba(0, 255, 204, 0.14);
      box-shadow: inset 0 0 0 calc(1 / 24 * 1rem) rgba(0, 255, 204, 0.12);

      path {
        fill: ${({ theme }) => theme.colors.text.primary};
      }

      .idle {
        opacity: 0;
      }
      .focused {
        opacity: 1;
      }
    }
  }

  &.selected.expanded {
    .icon {
      path {
        fill: ${({ theme }) => theme.colors.keyColor.item};
      }
    }
  }

  &.expanded {
    .label {
      display: block;
    }

    .icon {
      background: none;
      box-shadow: none;
    }
  }
`;

const GlobalNavigationChildIcon = styled.div`
  position: relative;

  width: calc(66 / 24 * 1rem);
  height: calc(66 / 24 * 1rem);

  border-radius: 0.5rem;

  flex: 0 0 auto;
`;

const GlobalNavigationChildLabel = styled.span`
  display: none;

  margin-left: calc(10 / 24 * 1rem);

  flex-grow: 1;

  font-family: "LGSmartUI";
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  &.focused {
    opacity: 0;
  }
`;
