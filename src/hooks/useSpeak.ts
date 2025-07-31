import { useCallback } from "react";
import { useLunaApi } from "../api/luna/LunaApiProvider";
import SpeakService, { SpeakOptions } from "../services/SpeakService";

interface UseSpeakResult {
  speak: (options: string | SpeakOptions) => Promise<void>;
}

export default function useSpeak(): UseSpeakResult {
  const lunaApi = useLunaApi();

  const speak = useCallback(
    async (options: string | SpeakOptions) => {
      await SpeakService.speak(options, {
        lunaApi: lunaApi,
      });
    },
    [lunaApi]
  );

  return {
    speak: speak,
  };
}
