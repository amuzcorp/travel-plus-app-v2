import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  open: boolean;
  title?: string;
  content?: string;
  focusIdOnDismiss?: string | null;
}

const initialState: DialogState = {
  open: false,
  title: "",
  content: "",
  focusIdOnDismiss: null,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<{
        title?: string;
        content?: string;
        focusIdOnDismiss?: string | null;
      }>
    ) => {
      state.open = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.focusIdOnDismiss = action.payload.focusIdOnDismiss ?? null;
    },
    hide: (state) => {
      state.open = false;
      state.title = "";
      state.content = "";
    },
  },
});

export const { show, hide } = dialogSlice.actions;
export default dialogSlice.reducer;
