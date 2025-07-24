import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  open: boolean;
  title?: string;
  content?: string;
}

const initialState: DialogState = {
  open: false,
  title: "",
  content: "",
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
      }>
    ) => {
      state.open = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
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
