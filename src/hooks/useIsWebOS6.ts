import { useSelector } from "react-redux";

import { selectIsWebOS6 } from "../core/store/slices/tvSystemSlice";

// webOS 6.0 여부만 확인하는 훅
const useIsWebOS6 = () => {
  return useSelector(selectIsWebOS6);
};

export default useIsWebOS6;
