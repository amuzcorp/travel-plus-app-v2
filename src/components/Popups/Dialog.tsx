import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import React, { useCallback, useEffect } from "react";
import styled, { useTheme } from "styled-components";

import Button from "@enact/sandstone/Button";
import Scroller from "@enact/sandstone/Scroller";
import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import { Cell, Column } from "@enact/ui/Layout";

import { useDialog } from "../../hooks/useDialog";
import { rem } from "../../utils/rem";
import { translate } from "../../utils/translate";
import Text from "../Texts/MarqueeText";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => `${theme.zIndex.popup}`};
`;

const DialogBox = styled.div`
  padding: ${rem(40)} 0 ${rem(24)};
  background-color: rgba(55, 58, 65, 0.95);
  box-shadow: 0px ${rem(14)} ${rem(30)} 0px rgba(0, 0, 0, 0.95);
  border-radius: ${rem(24)};
`;

const ContentBox = styled.div`
  padding-left: ${rem(50)};
  padding-right: ${rem(50)};
  width: ${rem(1052)};
  height: ${rem(404)};
  display: flex;
  flex-direction: column;
`;

const SpotlightDialogBox = SpotlightContainerDecorator(
  {
    restrict: "self-only",
  },
  DialogBox
);

const Dialog = React.memo(() => {
  const theme = useTheme();
  const { open, title = "", content = "", hideDialog } = useDialog();

  const handleClose = useCallback(() => {
    hideDialog();
  }, [hideDialog]);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (open) {
      disableBodyScroll(document.body);

      const spottables = Spotlight.getSpottableDescendants("dialog");
      if (spottables.length === 0) return;

      Spotlight.focus(spottables[1]);
    } else {
      enableBodyScroll(document.body);
    }

    return () => {
      enableBodyScroll(document.body);
    };
  }, [open]);

  return open ? (
    <Backdrop onClick={handleClose}>
      <div onClick={stopPropagation}>
        <SpotlightDialogBox spotlightId="dialog" spotlightRestrict="self-only">
          <Column>
            <Cell shrink style={{ padding: `0 ${rem(50)}` }}>
              <Text textStyle="titleXlSb">{title}</Text>
            </Cell>
            <Cell size={rem(36)} />
            <Cell shrink>
              <ContentBox>
                <Scroller>
                  <Text textStyle="bodyMdRg" color={theme.colors.text.secondary}>
                    {content}
                  </Text>
                </Scroller>
              </ContentBox>
            </Cell>
            <Cell size={rem(42)} />
            <Cell
              shrink
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleClose}>{translate("common.close")}</Button>
            </Cell>
          </Column>
        </SpotlightDialogBox>
      </div>
    </Backdrop>
  ) : null;
});

export default Dialog;
