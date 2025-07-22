import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spotlight from "@enact/spotlight";
import {
  collapse,
  GnbState,
  select,
  updateWantToCollapse,
} from "../../../core/store/slices/gnbSlice";
import { RootState } from "../../../core/store/store";
import Button from "@enact/sandstone/Button";

import css from "./GlobalNavigationBarButton.module.less";

import IGnbDestination from "../../../../assets/icons/gnb/IGnbDestination";
import IGnbDestinationFocused from "../../../../assets/icons/gnb/IGnbDestinationFocused";
import IGnbDestinationSelected from "../../../../assets/icons/gnb/IGnbDestinationSelected";
import IGnbExit from "../../../../assets/icons/gnb/IGnbExit";
import IGnbExitFocused from "../../../../assets/icons/gnb/IGnbExitFocused";
import IGnbExitSelected from "../../../../assets/icons/gnb/IGnbExitSelected";
import IGnbHome from "../../../../assets/icons/gnb/IGnbHome";
import IGnbHomeFocused from "../../../../assets/icons/gnb/IGnbHomeFocused";
import IGnbHomeSelected from "../../../../assets/icons/gnb/IGnbHomeSelected";
// import IGnbLogo from "../../../../assets/icons/gnb/IGnbLogo";
// import IGnbLogoTitle from "../../../../assets/icons/gnb/IGnbLogoTitle";
import IGnbLuggage from "../../../../assets/icons/gnb/IGnbLuggage";
import IGnbLuggageFocused from "../../../../assets/icons/gnb/IGnbLuggageFocused";
import IGnbLuggageSelected from "../../../../assets/icons/gnb/IGnbLuggageSelected";
import IGnbSearch from "../../../../assets/icons/gnb/IGnbSearch";
import IGnbSearchFocused from "../../../../assets/icons/gnb/IGnbSearchFocused";
import IGnbSearchSelected from "../../../../assets/icons/gnb/IGnbSearchSelected";
import IGnbSettings from "../../../../assets/icons/gnb/IGnbSettings";
import IGnbSettingsFocused from "../../../../assets/icons/gnb/IGnbSettingsFocused";
import IGnbSettingsSelected from "../../../../assets/icons/gnb/IGnbSettingsSelected";
// import IGnbUser from "../../../../assets/icons/gnb/IGnbUser";
// import IGnbUser6 from "../../../../assets/icons/gnb/IGnbUser6";
// import IGnbUserFocused from "../../../../assets/icons/gnb/IGnbUserFocused";
// import IGnbUserFocused6 from "../../../../assets/icons/gnb/IGnbUserFocused6";
import styled from "styled-components";
import $L from "@enact/i18n/$L";

interface GlobalNavigationBarButtonProps {
  type: keyof GnbIconType;
  index?: number;
  useFocus?: boolean;
  // onClick?: () => void;
}

const GlobalNavigationBarButton = React.memo(
  (props: GlobalNavigationBarButtonProps) => {
    const { type = "home", index = -1, useFocus = true } = props;

    const gnbState = useSelector((state: RootState) => state.gnb.value);
    const selectedIndex = useSelector(
      (state: RootState) => state.gnb.selectedIndex,
      (prev, next) => {
        return (index === prev) === (index === next);
      }
    );
    const dispatch = useDispatch();

    const collapseGnb = useCallback(() => {
      dispatch(collapse());
    }, [dispatch]);

    const icon = useMemo(() => {
      return <Icon type={type} state={"default"} />;
    }, [type]);

    const onSpotlightRight = useCallback(() => {
      dispatch(updateWantToCollapse(true));

      collapseGnb();

      Spotlight.move("right");
    }, [dispatch, collapseGnb]);

    const isSelected = useMemo(() => {
      return index === selectedIndex;
    }, [selectedIndex, index]);

    const buttonProps = useMemo(() => {
      return {
        id: type,
        spotlightId: type,
        icon: true,
        iconComponent: icon,
        selected: isSelected,
        spotlightDisabled: !useFocus,
        onClick: () => {
          dispatch(select(index));
        },
        onSpotlightRight: onSpotlightRight,
        css: css,
      };
    }, [type, icon, isSelected, useFocus, onSpotlightRight, dispatch, index]);

    return (
      <Button {...buttonProps}>
        {gnbState === GnbState.Expanded && (
          <StyledP>{$L(labelData[type])}</StyledP>
        )}
      </Button>
    );
  },
  (
    prevProps: GlobalNavigationBarButtonProps,
    nextProps: GlobalNavigationBarButtonProps
  ) => {
    return false;
  }
);

export default GlobalNavigationBarButton;

// const labelData:

const labelData: Record<string, string> = {
  home: "navigation.home",
  search: "navigation.search",
  destination: "navigation.destinations",
  luggage: "navigation.myLuggage",
  settings: "navigation.settings",
  exit: "navigation.exitApp",
};

const iconData: GnbIconType = {
  home: {
    default: IGnbHome,
    focused: IGnbHomeFocused,
    selected: IGnbHomeSelected,
  },
  destination: {
    default: IGnbDestination,
    focused: IGnbDestinationFocused,
    selected: IGnbDestinationSelected,
  },
  luggage: {
    default: IGnbLuggage,
    focused: IGnbLuggageFocused,
    selected: IGnbLuggageSelected,
  },
  search: {
    default: IGnbSearch,
    focused: IGnbSearchFocused,
    selected: IGnbSearchSelected,
  },
  settings: {
    default: IGnbSettings,
    focused: IGnbSettingsFocused,
    selected: IGnbSettingsSelected,
  },
  exit: {
    default: IGnbExit,
    focused: IGnbExitFocused,
    selected: IGnbExitSelected,
  },
};

interface GnbIconType {
  home: IconType;
  search: IconType;
  destination: IconType;
  luggage: IconType;
  settings: IconType;
  exit: IconType;
}

interface IconType {
  default: React.FC;
  focused: React.FC;
  selected: React.FC;
}

interface IconProps {
  type: keyof GnbIconType;
  state: keyof IconType;
}

const Icon = React.memo((props: IconProps) => {
  const IconComponent = iconData[props.type][props.state];

  return <IconComponent />;
});

// interface StyledPProps {
//   $expanded: boolean;
// }

const StyledP = styled.p``;
