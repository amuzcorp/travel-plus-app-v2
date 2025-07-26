import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { checkNetworkStatus } from "../utils/networkStatus";

const useNetworkMonitor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isErrorPage = location.pathname.includes("/network-error");

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isErrorPage) return;

      const isOnline = await checkNetworkStatus();

      if (!isOnline) {
        navigate("/network-error", { replace: false });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate, isErrorPage]);
};
export default useNetworkMonitor;
