import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "../core/store/slices/accountSlice";

// 로그인 상태만 확인하는 훅
const useIsLoggedIn = () => {
  return useSelector(selectIsLoggedIn);
};

export default useIsLoggedIn;
