import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../core/store";
import { hide, show } from "../core/store/slices/dialogSlice";

interface DialogPayload {
  title?: string;
  content?: string;
}

export const useDialog = () => {
  const dispatch = useDispatch();
  const { open, title, content } = useSelector((state: RootState) => state.dialog);

  const showDialog = (payload: DialogPayload) => {
    dispatch(show(payload));
  };

  const hideDialog = () => dispatch(hide());

  return {
    open,
    title,
    content,
    showDialog,
    hideDialog,
  };
};
