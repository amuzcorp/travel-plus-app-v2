import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "@enact/sandstone/Button";
import { Cell } from "@enact/ui/Layout";

import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";

import RoundButton from "../../components/Buttons/RoundButton/RoundButton";
import ScrollToTopButton from "../../components/Buttons/ScrollToTopButton/ScrollToTopButton";
import ContentCard from "../../components/Cards/ContentCard/ContentCard";
import TestCard from "../../components/Cards/TestCard";
import ScrollableRow from "../../components/Scrollables/ScrollableRow";
import { useScrollableRow } from "../../components/Scrollables/useScrollableRow";
import { setLastFocused } from "../../core/store/slices/homeSlice";

const HomePage: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { ref: scrollerRef, onKeyDown } = useScrollableRow();

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

  const listData = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div style={{ paddingLeft: "130px" }}>
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
      <RoundButton active={false}>T</RoundButton>
      <RoundButton active>
        efjiajdfieifja;sdlfjkliejfa;lsdkfjasdlifjie;jasldk
      </RoundButton>

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

      <ScrollToTopButton type="large" />
      <ScrollToTopButton type="small" />

      <ScrollableRow scrollerRef={scrollerRef} $marginLeft={130}>
        {listData.map((__, index) => {
          return (
            <ContentCard
              title={`title ${index}`}
              description="DESCRIPTION"
              onKeyDown={onKeyDown}
            />
          );
        })}
      </ScrollableRow>

      {/* <div
        style={{
          marginTop: "-24px",
          marginBottom: "-24px",
        }}
      >
        <div
          ref={ref}
          style={{
            marginLeft: "-130px",
            padding: "24px 0",
            overflowX: "scroll",
          }}
        >
          <SpottableTest spotlightId="test-container">
            {listData.map((__, index) => {
              return (
                <ContentCard
                  title={`title ${index}`}
                  description="DESCRIPTION"
                  onKeyDown={(ev: React.KeyboardEvent) => {
                    requestAnimationFrame(() => {
                      const target = Spotlight.getCurrent();

                      if (target instanceof Element) {
                        const targetRect = target.getBoundingClientRect();
                        const targetLeft = targetRect.left;
                        const diff = targetLeft - 130;

                        const wrapper = ref.current as HTMLElement;

                        const scrollLeft = wrapper.scrollLeft;

                        wrapper.scroll({
                          left: Math.max(0, scrollLeft + diff),
                          behavior: "smooth",
                        });
                      }
                    });
                  }}
                />
              );
            })}
          </SpottableTest>
        </div>
      </div> */}

      <TestCard>
        ejfa;isdojfo;wefj;aslkdfj;ewoifjasdl;kfj;eiwofja;sdlkfj;asld
      </TestCard>
    </div>
  );
});

export default HomePage;

const Div = styled.div`
  position: relative;

  display: flex;

  gap: 24px;

  & {
    .dimmed {
      background: yellow;
    }
  }
`;

const SpottableTest = SpotlightContainerDecorator(Div);

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
