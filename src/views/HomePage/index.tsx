import { setLastFocused } from "../../core/store/slices/homeSlice";
import Button from "@enact/sandstone/Button";
import { Cell, Column } from "@enact/ui/Layout";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DefaultFocusProps,
  useDefaultFocus,
} from "../../hooks/useDefaultFocus";
import RoundButton from "../../components/Buttons/RoundButton/RoundButton";
import styled from "styled-components";
import Item from "@enact/sandstone/Item/Item"
import Marquee from "@enact/ui/Marquee";

const HomePage: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const data = [
    {
      label: "Go To Search",
      onClick: () => {
        navigate("/search");
      },
    },
    {
      label: "Go To Destinaion",
      onClick: () => {
        navigate("/destination");
      },
    },
    {
      label: "Go To My Luggage",
      onClick: () => {
        navigate("/my-luggage");
      },
    },
    {
      label: "Go To Settings",
      onClick: () => {
        navigate("/settings");
      },
    },
  ];

  const defaultFocusProps: DefaultFocusProps = {
    defaultFocusKey: null,
    focusInterface: null,
  };

  useDefaultFocus(defaultFocusProps);

  return (
    <Column>
      {data.map((value, index) => {
        const id = "HOME_" + index;

        return (
          <TestButton
            key={index}
            id={id}
            label={value.label}
            onClick={value.onClick}
          />
        );
      })}
      {/* <Cell size={"24px"}></Cell> */}
      <Cell>
        <RoundButton>efjiajdfieifja;sdlfjkliejfa;lsdkfjasdlifjie;jasldk</RoundButton>
      </Cell>
      
      <CustomItem marqueeOn={"focus"} inline={true}>
        <Column >
          <Cell shrink>
            <Image />
          </Cell>
          <Cell size={'320px'} shrink component={Marquee}>
            sdjfeijfa;isdjf;klejfa;oisdjf;iaelsjf;klasdjf;lesjfai;lsdjfklasdjf;liejf;laksdj
          </Cell>
        </Column>
      </CustomItem>
    </Column>
  );
});

export default HomePage;

interface TestButtonProps {
  id: string;
  label: string;
  onClick: Function;
}

const TestButton = React.memo(
  (props: TestButtonProps) => {
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
      props.onClick();
    }, [props]);

    const onFocus = useCallback(
      (ev: React.FocusEvent) => {
        dispatch(setLastFocused(props.id));
      },
      [dispatch, props]
    );

    return (
      <Cell>
        <Button
          id={props.id}
          spotlightId={props.id}
          onClick={onClick}
          onFocus={onFocus}
        >
          {props.label}
        </Button>
      </Cell>
    );
  },
  (prev, next) => false
);

const Image = styled.div`
  width: 310px;
  height: 210px;
  background: tomato;
`;

const CustomItem = styled(Item)`
  height: fit-content;
`;
