import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useAuthApi } from "../core/api/auth/AuthApiProvider";
import { useLunaApi } from "../core/api/luna/LunaApiProvider";
import type { AppDispatch } from "../core/store";
import { setAccountState } from "../core/store/slices/accountSlice";
import { Account } from "../entities";
import AccountManager from "../utils/AccountManager";

// 로그인, 로그아웃 => LG 계정 앱을 호출하는 훅
const useCallLgAccountApp = () => {
  const authApi = useAuthApi();
  const lunaApi = useLunaApi();

  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (isLogin = true) => {
      const result = await AccountManager.callLgAccountApp({
        isLogin: isLogin,
        authApi: authApi,
        lunaApi: lunaApi,
      });

      if (result.account === Account.empty()) {
        return;
      }

      dispatch(setAccountState(result.account));
    },
    [dispatch]
  );
};

export default useCallLgAccountApp;
