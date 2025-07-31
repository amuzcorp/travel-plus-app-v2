import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { checkNetworkStatus } from "../services/networkStatus";

const useNetworkMonitor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(async () => {
      const isErrorPage = location.pathname.includes("/network-error");

      if (isErrorPage) return;

      const isOnline = await checkNetworkStatus();

      if (!isOnline) {
        navigate("/network-error", { replace: false });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate, location.pathname]);
};
export default useNetworkMonitor;
