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

export const speakIfAudioGuidanceOn = async ({
  text,
  clear = true,
}: //   languageCode = "ko-KR",
SpeakOptions) => {
  try {
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
    console.error("오류 발생 : ", err);
    console.log("TTS : ", text);
  }
};
