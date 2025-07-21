import React, { useCallback } from "react";

import $L from "@enact/i18n/$L";
import Scroller from "@enact/sandstone/Scroller";
import Button from "@enact/sandstone/Button";
import { Column } from "@enact/ui/Layout";
import Spotlight from "@enact/spotlight";

const HomePage: React.FC = () => {
  const list = Array.from({ length: 100 }, (__, i) => i);

  const scrollTo = useCallback(() => {
    const current = Spotlight.getCurrent() as any;
    if (current && typeof current.scrollIntoView === "function") {
      current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, []);

  // const throttleScrollTo = useMemo(() => {
  //   return new Job(scrollTo, 300);
  // }, [scrollTo]);

  const onClick = useCallback(() => {
    // throttleScrollTo.throttle();
    scrollTo();
  }, [scrollTo]);

  const onFocus = useCallback(() => {
    const isPointerMode = Spotlight.getPointerMode();
    if (isPointerMode) {
      return;
    }

    // throttleScrollTo.throttle();
    scrollTo();
  }, [scrollTo]);

  const scrollerProps = {
    direction: "vertical" as const,
    verticalScrollbar: "hidden" as const,
    scrollMode: "translate" as const,
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
            <Button key={index} id={index.toString()} {...buttonProps}>
              {$L("common.delete")}
            </Button>
          );
        })}
      </Column>
    </Scroller>
  );
};

export default HomePage;
