import { useSelector } from "react-redux";

import { selectTVSystemInfo } from "../core/store/slices/tvSystemSlice";

// TV 시스템 정보를 확인하는 훅(webOS 6.0 여부 포함)
const useTVSystemInfo = () => {
  return useSelector(selectTVSystemInfo);
};

export default useTVSystemInfo;
