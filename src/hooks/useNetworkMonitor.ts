import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useLunaApi } from "../api/luna/LunaApiProvider";
import NetworkService from "../services/NetworkService";

const useNetworkMonitor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lunaApi = useLunaApi();

  useEffect(() => {
    const interval = setInterval(async () => {
      const isErrorPage = location.pathname.includes("/network-error");

      if (isErrorPage) return;

      const isOnline = await NetworkService.checkNetworkStatus(lunaApi);

      if (!isOnline) {
        navigate("/network-error", { replace: false });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate, location.pathname, lunaApi]);
};
export default useNetworkMonitor;
