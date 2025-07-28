import { useCallback } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../core/store";
import { callLgAccountApp } from "../utils/accountManager";

// 로그인, 로그아웃 => LG 계정 앱을 호출하는 훅
const useCallLgAccountApp = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (isLogin = true) => {
      return await dispatch(callLgAccountApp(isLogin));
    },
    [dispatch]
  );
};

export default useCallLgAccountApp;
