import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../core/store";
import { fetchAccountInfo } from "../utils/accountManager";
import { fetchTVSystemInfo } from "../utils/fetchTVsystemInfo";

const useInitSystemInfo = () => {
  // const homeApi = useHomeApi();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const init = async () => {
      // TV 시스템 정보 초기화
      await dispatch(fetchTVSystemInfo());

      // 계정 정보 초기화(webOS 6.0 여부에 따라 다른 방식으로 계정 정보를 가져오기 때문에 TV 시스템 정보 초기화 후에 계정 정보를 가져와야 함)
      await dispatch(fetchAccountInfo());

      // const homeBanners = await homeApi.getMainBanners();
      // await dispatch(fetchHomeBanners(homeBanners));
    };

    init();
  }, [dispatch]);
};

export default useInitSystemInfo;
