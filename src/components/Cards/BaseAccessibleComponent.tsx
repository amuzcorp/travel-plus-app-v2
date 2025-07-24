import { ItemDecorator } from "@enact/sandstone/Item";
import AnnounceDecorator from "@enact/ui/AnnounceDecorator";

import Spotlight from "@enact/spotlight";
import { filterDOMProps } from "../../utils/filterDOMProps";

// 카드 자체를 감싸기 위해 기본 컴포넌트를 생성
const BaseCard = ({
  children,
  announce,
  component: Component = "div",
  ...rest
}: any) => {
  const safeProps = filterDOMProps(rest);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const directionMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    } as const;

    const direction = directionMap[e.key as keyof typeof directionMap];
    if (direction) {
      const current = Spotlight.getCurrent();
      setTimeout(() => {
        const after = Spotlight.getCurrent();
        if (current === after) {
          const message = {
            up: "더 이상 위쪽으로 이동할 수 없습니다.",
            down: "더 이상 아래쪽으로 이동할 수 없습니다.",
            left: "더 이상 왼쪽으로 이동할 수 없습니다.",
            right: "더 이상 오른쪽으로 이동할 수 없습니다.",
          }[direction];
          announce?.(message);
          console.log(message);
        }
      }, 10);
    }
  };

  const handleFocus = (e: React.FocusEvent) => {
    rest.onFocus?.(e);
    const text = typeof children === "string" ? children : rest.announceText;
    if (text) announce?.(text);
    console.log(text || "할말 없음");
  };

  return (
    <Component
      {...safeProps}
      onFocus={handleFocus}
      onKeyDown={(e: any) => {
        rest.onKeyDown?.(e);
        handleKeyDown(e);
      }}
    >
      {children}
    </Component>
  );
};

const BaseAccessibleComponent = AnnounceDecorator(ItemDecorator(BaseCard));

export default BaseAccessibleComponent;
