import styled from "styled-components";

import { Cell, Column } from "@enact/ui/Layout";
import Marquee from "@enact/ui/Marquee";

import BaseAccessibleComponent from "./BaseAccessibleComponent";

// styled div
const CardWrapper = styled.div`
  padding: 16px;
  width: 300px;
  height: auto;
  border: 1px solid gray;
  background-color: blue;

  &:focus {
    border: 3px solid skyblue;
    background-color: yellow;
  }
  &:focus .Image {
    border: 3px solid skyblue;
    background: white;
  }
`;

const Image = styled.div.attrs({
  className: "Image",
})`
  width: 200px;
  height: 210px;
  background: tomato;
`;

// 카드 자체를 감싸기 위해 기본 컴포넌트를 생성
const CustomItemCard = ({ children }: any) => {
  return (
    <BaseAccessibleComponent component={CardWrapper} announceText="나는 바보야 집에 가고 싶다">
      <Column>
        <Cell shrink>
          <Image />
        </Cell>
        <Cell size="320px" shrink style={{ overflow: "hidden" }} component={Marquee}>
          {children}
        </Cell>
        <Cell size="320px" shrink style={{ overflow: "hidden" }}>
          {children}
        </Cell>
      </Column>
    </BaseAccessibleComponent>
  );
};

// const CustomItemCard = AnnounceDecorator(ItemDecorator(BaseCard));

export default CustomItemCard;
