import styled from "styled-components";

import { ItemDecorator } from "@enact/sandstone/Item";
import { Cell, Column } from "@enact/ui/Layout";
import Marquee from "@enact/ui/Marquee";

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
const BaseCard = ({ children, ...rest }: any) => {
  return (
    <CardWrapper {...rest} marqueeOn={"focus"}>
      <Column>
        <Cell shrink>
          <Image />
        </Cell>
        <Cell size="320px" shrink component={Marquee}>
          {children}
        </Cell>
        <Cell size="320px" shrink style={{ overflow: "hidden" }}>
          {children}
        </Cell>
      </Column>
    </CardWrapper>
  );
};

const CustomItemCard = ItemDecorator(BaseCard);

export default () => (
  <CustomItemCard>
    sdjfeijfa;isdjf;klejfa;oisdjf;iaelsjf;klasdjf;lesjfai;lsdjfklasdjf;liejf;laksdj
  </CustomItemCard>
);
