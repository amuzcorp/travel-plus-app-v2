import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAuthApi } from "../core/api/auth/AuthApiProvider";
import { useLunaApi } from "../core/api/luna/LunaApiProvider";
import type { AppDispatch } from "../core/store";
import { setAccountState } from "../core/store/slices/accountSlice";
import AccountManager from "../utils/AccountManager";
import { fetchTVSystemInfo } from "../utils/fetchTVsystemInfo";

const useInitSystemInfo = () => {
  // const homeApi = useHomeApi();
  const authApi = useAuthApi();
  const lunaApi = useLunaApi();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const init = async () => {
      // TV 시스템 정보 초기화
      await dispatch(fetchTVSystemInfo());

      // 계정 정보 초기화(webOS 6.0 여부에 따라 다른 방식으로 계정 정보를 가져오기 때문에 TV 시스템 정보 초기화 후에 계정 정보를 가져와야 함)
      const fetchResult = await AccountManager.fetchAccountInfo({
        authApi: authApi,
        lunaApi: lunaApi,
      });
      dispatch(setAccountState(fetchResult.account));

      // const homeBanners = await homeApi.getMainBanners();
      // await dispatch(fetchHomeBanners(homeBanners));
    };

    init();
  }, [dispatch]);
};

export default useInitSystemInfo;
