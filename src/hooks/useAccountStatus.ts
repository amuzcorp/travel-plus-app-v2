import { useSelector } from "react-redux";

import { selectAccount } from "../core/store/slices/accountSlice";

// 전체 계정 상태 확인하는 훅(로그인 상태 포함)
const useAccountStatus = () => {
  return useSelector(selectAccount);
};

export default useAccountStatus;
