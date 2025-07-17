import { useCallback } from "react";

import Scroller from "@enact/sandstone/Scroller";
import Button from "@enact/sandstone/Button";
import { Column } from "@enact/ui/Layout";
import Spotlight from "@enact/spotlight";

const HomePage = () => {
  const list = Array.from({ length: 100 }, (__, i) => i);

  const scrollTo = useCallback(() => {
    const current = Spotlight.getCurrent();
    current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, []);

  // const throttleScrollTo = useMemo(() => {
  //   return new Job(scrollTo, 300);
  // }, [scrollTo]);

  const onClick = useCallback(() => {
    // throttleScrollTo.throttle();
    scrollTo.call();
  }, [scrollTo]);

  const onFocus = useCallback(() => {
    const isPointerMode = Spotlight.getPointerMode();
    if (isPointerMode) {
      return;
    }

    // throttleScrollTo.throttle();
    scrollTo.call();
  }, [scrollTo]);

  const scrollerProps = {
    direction: "vertical",
    verticalScrollbar: "hidden",
    scrollMode: "translate",
  };

  const buttonProps = {
    onClick: onClick,
    onFocus: onFocus,
  };

  return (
    <Scroller {...scrollerProps}>
      <Column>
        {list.map((__, index) => {
          return (
            <Button key={index} id={index} {...buttonProps}>
              Click me {index}
            </Button>
          );
        })}
      </Column>
    </Scroller>
  );
};

export default HomePage;
