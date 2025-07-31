import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAuthApi } from "../api/auth/AuthApiProvider";
import { useLunaApi } from "../api/luna/LunaApiProvider";
import AccountManager from "../services/AccountService";
import TvService from "../services/TvService";
import type { AppDispatch } from "../store";
import { setAccountState } from "../store/slices/accountSlice";
import { setTVSystemInfo } from "../store/slices/tvSystemSlice";

const useInitSystemInfo = () => {
  // const homeApi = useHomeApi();
  const authApi = useAuthApi();
  const lunaApi = useLunaApi();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const init = async () => {
      // TV 시스템 정보 초기화
      const systemInfo = await TvService.getSystemInfo(lunaApi);
      dispatch(setTVSystemInfo(systemInfo));

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
  }, [dispatch, authApi, lunaApi]);
};

export default useInitSystemInfo;
