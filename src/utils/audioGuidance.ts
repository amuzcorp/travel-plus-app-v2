import LS2Request from "@enact/webos/LS2Request";

interface SpeakOptions {
  text: string;
  clear?: boolean;
  languageCode?: string;
}

const requestLS2 = (service: string, method: string, parameters: object): Promise<any> => {
  return new Promise((resolve, reject) => {
    new LS2Request().send({
      service,
      method,
      parameters,
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

export const speak = async (options: string | SpeakOptions): Promise<void> => {
  try {
    const text = typeof options === "string" ? options : options.text;
    const clear = typeof options === "string" ? true : options.clear ?? true;
    // const languageCode = typeof options === "string" ? "ko-KR" : options.languageCode;

    const res = await requestLS2("luna://com.webos.settingsservice", "getSystemSettings", {
      category: "option",
      keys: ["audioGuidance"],
    });

    if (res?.settings?.audioGuidance === "on") {
      await requestLS2("luna://com.webos.service.tts", "speak", {
        text,
        clear,
        // language: languageCode,
      });
    }
  } catch (err) {
    console.error("오디오 가이던스 실행 오류:", err);
    console.log("TTS fallback (log only):", typeof options === "string" ? options : options.text);
  }
};
