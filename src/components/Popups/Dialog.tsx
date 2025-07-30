import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import React, { useCallback, useEffect } from "react";
import styled, { useTheme } from "styled-components";

import Scroller from "@enact/sandstone/Scroller";
import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import { Cell, Column } from "@enact/ui/Layout";

import { useDialog } from "../../hooks/useDialog";
import { translate } from "../../utils/translate";
import RectangleButton from "../Buttons/RectangleButton/RectangleButton";
import MarqueeText from "../Texts/MarqueeText";
import Text from "../Texts/Text";

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
  padding: 40px 0 24px;
  background-color: rgba(55, 58, 65, 0.95);
  box-shadow: 0px 14px 30px 0px rgba(0, 0, 0, 0.95);
  border-radius: 24px;
`;

const ContentBox = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  width: 1052px;
  height: 404px;
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
  const { open, title = "", content = "", hideDialog } = useDialog();
  const theme = useTheme();

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
            <Cell shrink style={{ padding: `0 50px` }}>
              <MarqueeText textStyle="titleXlSb">{title}</MarqueeText>
            </Cell>
            <Cell size={36} />
            <Cell shrink>
              <ContentBox>
                <Scroller>
                  <Text
                    maxLine={0}
                    textStyle="bodyMdRg"
                    color={theme.colors.text.secondary}
                  >
                    {content}
                  </Text>
                </Scroller>
              </ContentBox>
            </Cell>
            <Cell size={42} />
            <Cell
              shrink
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RectangleButton
                onClick={handleClose}
                speaker={translate(["common.close", "common.button"])}
                spotlightId={"dialog-close"}
              >
                {translate("common.close")}
              </RectangleButton>
            </Cell>
          </Column>
        </SpotlightDialogBox>
      </div>
    </Backdrop>
  ) : null;
});

export default Dialog;
