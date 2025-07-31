import ILunaApi from "../api/luna/iLunaApi";
import LunaApi from "../api/luna/LunaApi";
import { appId } from "../constants/globalConstant";
import env from "../env";
import store from "../store";
import { selectIsWebOS6 } from "../store/slices/tvSystemSlice";

export default class NetworkService {
  static async checkNetworkStatus(lunaApi: ILunaApi): Promise<boolean> {
    if (env.IS_LOCAL) {
      return true;
    }

    const result = await lunaApi.checkNetworkStatus();

    return result.isInternetConnectionAvailable === true;
  }

  static async launchNetworkSettings(lunaApi: LunaApi): Promise<void> {
    const isWebOS6 = selectIsWebOS6(store.getState());

    const targetApp = isWebOS6
      ? "com.palm.app.settings"
      : "com.webos.app.firstuse-overlay";

    const params = isWebOS6
      ? { target: "network" }
      : { id: appId, target: "network" };

    try {
      await lunaApi.launchApp({
        id: targetApp,
        params,
      });
    } catch (e) {
      console.log("Error from launchNetworkSettings : " + e);
    }
  }
}
