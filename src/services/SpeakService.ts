import ILunaApi from "src/api/luna/iLunaApi";

export interface SpeakOptions {
  text: string;
  clear?: boolean;
  languageCode?: string;
}

export default class SpeakService {
  static async speak(
    options: string | SpeakOptions,
    { lunaApi }: { lunaApi: ILunaApi }
  ): Promise<void> {
    try {
      const text = typeof options === "string" ? options : options.text;
      const clear = typeof options === "string" ? true : options.clear ?? true;
      // const languageCode = typeof options === "string" ? "ko-KR" : options.languageCode;

      await lunaApi.speak({
        text,
        clear,
        //   // language: languageCode,    // 안보내줘도 알아서 처리됨
      });
    } catch (err) {
      console.error("오디오 가이던스 실행 오류:", err);
      console.log(
        "TTS fallback (log only):",
        typeof options === "string" ? options : options.text
      );
    }
  }
}
