import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

interface SectionWrapperProps {
  id?: string;
  $marginLeft?: number;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  onClick?: () => void;
  onInView?: (sectionKey: string) => void;
  children: React.ReactNode;
}

export default React.memo(
  ({
    id,
    $marginLeft = 0,
    onKeyDown = (ev: React.KeyboardEvent) => {},
    onClick = () => {},
    children,
  }: SectionWrapperProps) => {
    const { ref, inView } = useInView({ threshold: 0.9 });
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      if (!inView) {
        setHovered(false);
      }
    }, [inView]);

    return (
      <Wrapper
        ref={ref}
        id={id}
        className={
          `${inView ? "" : "in-active"}` + " " + `${hovered ? "hovered" : ""}`
        }
        $marginLeft={$marginLeft}
        onKeyDown={(ev: React.KeyboardEvent) => {
          onKeyDown(ev);

          setHovered(false);
        }}
      >
        {children}
        {!inView && (
          <WrapperOverlay
            onClick={onClick}
            onMouseEnter={(ev: React.MouseEvent) => {
              setHovered(true);
            }}
            onMouseLeave={(ev: React.MouseEvent) => {
              setHovered(false);
            }}
          />
        )}
      </Wrapper>
    );
  }
);

const Wrapper = styled.div<{ $marginLeft?: number }>`
  position: relative;

  width: ${({ $marginLeft }) => `calc(100vw - ${$marginLeft ?? 0}px)`};
  margin-left: ${({ $marginLeft }) => $marginLeft ?? 0}px;

  transition: opacity ease 0.3s;

  &.in-active {
    opacity: 0.3;

    /* & * > .home-city-large {
      outline: none;
    } */

    &.hovered {
      opacity: 1;
    }
  }
`;

const WrapperOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;
