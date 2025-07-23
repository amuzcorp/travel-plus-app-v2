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
import ScrollToTopButton from "../../components/Buttons/ScrollToTopButton/ScrollToTopButton";

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
        <RoundButton active={false}>
          efjiajdfieifja;sdlfjkliejfa;lsdkfjasdlifjie;jasldk
        </RoundButton>
      </Cell>
      <Cell>
        <RoundButton active>
          efjiajdfieifja;sdlfjkliejfa;lsdkfjasdlifjie;jasldk
        </RoundButton>
      </Cell>

      {/* <CustomItem marqueeOn={"focus"} inline>
        <Column>
          <Cell shrink>
            <Image />
          </Cell>
          <Cell size={"320px"} shrink component={Marquee}>
            sdjfeijfa;isdjf;klejfa;oisdjf;iaelsjf;klasdjf;lesjfai;lsdjfklasdjf;liejf;laksdj
          </Cell>
          <Cell size={"320px"} shrink>
            sdjfeijfa;isdjf;klejfa;oisdjf;iaelsjf;klasdjf;lesjfai;lsdjfklasdjf;liejf;laksdj
          </Cell>
        </Column>
      </CustomItem> */}

      <Cell>
        <ScrollToTopButton
          type="large"
          onClick={() => {
            console.log("hello");
          }}
        />
      </Cell>
      <Cell>
        <ScrollToTopButton type="small" />
      </Cell>
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

// const Image = styled.div`
//   width: 310px;
//   height: 210px;
//   background: tomato;
// `;

// const CustomItem = styled(Item)`
//   height: fit-content;
// `;
