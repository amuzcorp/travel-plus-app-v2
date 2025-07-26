import { useEffect } from "react";
import { setLanguageCode } from "../utils/languageStatus";

const useLocaleChange = () => {
  useEffect(() => {
    // 초기 언어 코드 설정
    setLanguageCode();

    const handler = async () => {
      await setLanguageCode();
      window.location.reload();
    };

    document.addEventListener("webOSLocaleChange", handler);

    return () => {
      document.removeEventListener("webOSLocaleChange", handler);
    };
  }, []);
};

export default useLocaleChange;
