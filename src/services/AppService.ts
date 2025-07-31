import ILunaApi from "src/api/luna/iLunaApi";

export default class AppService {
  static async kill(lunaApi: ILunaApi): Promise<boolean> {
    try {
      await lunaApi.killApp();

      return true;
    } catch (e) {
      // let errorMessage = "앱 종료에 실패했습니다.";

      // if (err.errorCode === 2) {
      //   errorMessage = "앱이 실행 중이지 않거나 앱 ID를 찾을 수 없습니다.";
      // } else if (err.errorText) {
      //   errorMessage = `앱 종료 실패(closeByAppId): ${err.errorText}`;
      // }

      console.log("Error from killApp : " + e);

      return false;
    }
  }
}
