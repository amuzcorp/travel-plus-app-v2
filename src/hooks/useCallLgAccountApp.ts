import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useAuthApi } from "../api/auth/AuthApiProvider";
import { useLunaApi } from "../api/luna/LunaApiProvider";
import { Account } from "../entities";
import AccountManager from "../services/AccountService";
import type { AppDispatch } from "../store";
import { setAccountState } from "../store/slices/accountSlice";

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

      const account = result.account;

      dispatch(setAccountState(account));
    },
    [dispatch, authApi, lunaApi]
  );
};

export default useCallLgAccountApp;
