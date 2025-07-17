import Scroller from "@enact/sandstone/Scroller";
import Button from "@enact/sandstone/Button";
import { Column } from "@enact/ui/Layout";
import Spotlight from "@enact/spotlight";
import { useCallback } from "react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

const HomePage = () => {
  const list = Array.from({ length: 100 }, (__, i) => i);

  const onClick = useCallback(() => {
    const current = Spotlight.getCurrent();
    current?.scrollIntoView({
      block: "center",
    });
  }, []);

  const onFocus = useCallback(() => {
    const isPointerMode = Spotlight.getPointerMode();
    if (isPointerMode) {
      return;
    }

    const current = Spotlight.getCurrent();
    current?.scrollIntoView({
      block: "center",
      // behavior: "smooth",
    });
  }, []);

  const scrollerProps = {
    direction: "vertical",
    verticalScrollbar: "hidden",
  };

  const buttonProps = {
    style: { margin: "50px 0" },
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
        <VideoPlayer />
      </Column>
    </Scroller>
  );
};

export default HomePage;
