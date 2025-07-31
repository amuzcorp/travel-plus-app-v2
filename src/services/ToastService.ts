import ILunaApi from "src/api/luna/iLunaApi";

export default class ToastService {
  static async show(lunaApi: ILunaApi, message: string): Promise<void> {
    lunaApi.createToast(message);
  }
}
