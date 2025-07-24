import React, { useCallback, useEffect } from "react";
import styled, { useTheme } from "styled-components";

import $L from "@enact/i18n/$L";
import Button from "@enact/sandstone/Button";
import Scroller from "@enact/sandstone/Scroller";
import Spotlight from "@enact/spotlight";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import { Cell, Column } from "@enact/ui/Layout";

import { useDialog } from "../../hooks/useDialog";
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

// 다이얼로그 박스
const DialogBox = styled.div`
  padding: 40px 0 24px;
  background-color: rgba(55, 58, 65, 0.95);
  box-shadow: 0px 14px 30px 0px rgba(0, 0, 0, 0.95);
  border-radius: 24px;
`;

// 텍스트 영역
const ContentBox = styled.div`
  padding-left: 50px;
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
      const spottables = Spotlight.getSpottableDescendants("dialog");
      if (spottables.length === 0) return;

      // 닫기 버튼에 포커스됨
      Spotlight.focus(spottables[1]);

      // TODO
      // 포커스 가능한 스크롤바 만들기
      // 스크롤바가 있을 때는 거기로 포커스, 아니면 닫기 버튼에 포커스
      // 포커스 위치에 따라 오디오가이던스 발화
    }
  }, [open]);

  return open ? (
    <Backdrop onClick={handleClose}>
      <div onClick={stopPropagation}>
        <SpotlightDialogBox spotlightId="dialog" spotlightRestrict="self-only">
          <Column>
            <Cell shrink style={{ padding: "0 50px" }}>
              <Text textStyle="titleXlSb">{title}</Text>
            </Cell>
            <Cell size="36px" />
            <Cell shrink>
              <ContentBox style={{ paddingRight: "50px" }}>
                <Scroller>
                  <Text textStyle="bodyMdRg" color={theme.colors.text.secondary}>
                    {content}
                  </Text>
                </Scroller>
              </ContentBox>
            </Cell>
            <Cell size="42px" />
            <Cell
              shrink
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleClose}>{$L("common.close")}</Button>
            </Cell>
          </Column>
        </SpotlightDialogBox>
      </div>
    </Backdrop>
  ) : null;
});

export default Dialog;
