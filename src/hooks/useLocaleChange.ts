import { useEffect } from "react";

import { useLunaApi } from "../api/luna/LunaApiProvider";
import LanguageService from "../services/LanguageService";

const useLocaleChange = () => {
  const lunaApi = useLunaApi();

  useEffect(() => {
    // LanguageService.setLanguageCode(lunaApi);

    const handler = async () => {
      await LanguageService.setLanguageCode(lunaApi);

      if (typeof window !== "undefined") {
        window.location.reload();
      }
    };

    // 초기 언어 코드 설정
    // handler();

    document.addEventListener("webOSLocaleChange", handler);

    return () => {
      document.removeEventListener("webOSLocaleChange", handler);
    };
  }, [lunaApi]);
};

export default useLocaleChange;
