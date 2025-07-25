import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../core/store";
import { hide, show } from "../core/store/slices/spinnerSlice";

export const useSpinner = () => {
  const dispatch = useDispatch();
  const start = useSelector((state: RootState) => state.spinner.start);

  const showSpinner = () => dispatch(show());
  const hideSpinner = () => dispatch(hide());

  return { start, showSpinner, hideSpinner };
};
