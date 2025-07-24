import { useDispatch, useSelector } from "react-redux";

import { hide, show } from "../core/store/slices/spinnerSlice";
import { RootState } from "../core/store/store";

export const useSpinner = () => {
  const dispatch = useDispatch();
  const start = useSelector((state: RootState) => state.spinner.start);

  const showSpinner = () => dispatch(show());
  const hideSpinner = () => dispatch(hide());

  return { start, showSpinner, hideSpinner };
};
