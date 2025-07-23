import Spottable from "@enact/spotlight/Spottable";
import React from "react";
import styled from "styled-components";
import { RoundButtonBase } from "../RoundButton/RoundButton";
import AnnounceDecorator from "@enact/ui/AnnounceDecorator";

import Icon from "../../../../assets/icons/IGoToTopIcon";

const ScrollToTopButton = React.memo(
  ({ type = "large", onClick = () => {}, announce, ...rest }: any) => {
    return (
      <StyledRoundButton
        marqueeDisabled
        $isSmall={type === "small"}
        onClick={onClick}
        {...rest}
      >
        <Icon />
      </StyledRoundButton>
    );
  }
);

export default AnnounceDecorator(Spottable(ScrollToTopButton));

// export default React.memo(({ type = "small", announce, ...rest }: any) => {
//   const onFocus = useCallback(
//     (e: FocusEvent) => {
//       console.log(2);

//       console.log(rest.onFocus);

//       // rest.onFocus(e);

//       announce($L("common.goToTop"));
//     },
//     [announce, rest]
//   );

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     console.log(1);

//     const directionMap = {
//       ArrowUp: "up",
//       ArrowDown: "down",
//       ArrowLeft: "left",
//       ArrowRight: "right",
//     } as const;

//     const direction = directionMap[e.key as keyof typeof directionMap];

//     if (direction) {
//       const current = Spotlight.getCurrent();

//       setTimeout(() => {
//         const after = Spotlight.getCurrent();

//         console.log("이동 : ", current, after);

//         if (current === after) {
//           const message = {
//             up: "더 이상 위쪽으로 이동할 수 없습니다.",
//             down: "더 이상 아래쪽으로 이동할 수 없습니다.",
//             left: "더 이상 왼쪽으로 이동할 수 없습니다.",
//             right: "더 이상 오른쪽으로 이동할 수 없습니다.",
//           }[direction];

//           console.log(message);

//           announce?.(message);
//         }
//       }, 10);
//     }
//   };

//   return (
//     <ResultWidget
//       type={type}
//       onFocus={onFocus}
//       onKeyDown={handleKeyDown}
//       {...rest}
//     ></ResultWidget>
//   );
// });

interface StyledRoundButtonProps {
  $isSmall: boolean;
}

const StyledRoundButton = styled(RoundButtonBase)<StyledRoundButtonProps>`
  min-width: calc(150 / 24 * 1rem);
  height: calc(39 / 24 * 1rem);

  ${({ $isSmall }) =>
    $isSmall &&
    `
    padding: calc(16.5 / 24 * 1rem);
    min-width: calc(39 / 24 * 1rem);;
  `};

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: calc(39 / 24 * 1rem);
  line-height: 1;

  svg {
    position: absolute;
  }

  &:focus path {
    stroke: ${({ theme }) => theme.colors.text.primaryVari};
  }
`;
