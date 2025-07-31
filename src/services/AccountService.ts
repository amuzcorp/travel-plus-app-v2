import {
  selectIsWebOS6,
  selectTVSystemInfo,
} from "../store/slices/tvSystemSlice";

import IAuthApi from "../api/auth/iAuthApi";
import ILunaApi from "../api/luna/iLunaApi";
import { Account } from "../entities";
import env from "../env";
import store from "../store";

export interface AccountServiceResult {
  success: boolean;
  account: Account;
}

export default class AccountService {
  static async fetchAccountInfo({
    authApi,
    lunaApi,
  }: {
    authApi: IAuthApi;
    lunaApi: ILunaApi;
  }): Promise<AccountServiceResult> {
    const isWebOS6 = selectIsWebOS6(store.getState());

    try {
      const result = await lunaApi.getUserData();

      const isLogin = this.checkLogin(result.userData);

      if (!isLogin) {
        await authApi.logoutFromAmuz();
        return {
          success: false,
          account: Account.empty(),
        };
      }

      const accountInfo = this.getAccountInfo(
        result.id,
        result.userData,
        isWebOS6
      );
      const account = await authApi.loginToAmuz(accountInfo);

      return {
        success: true,
        account: account,
      };
    } catch (e) {
      const useDev = env.IS_LOCAL || env.IS_DEVELOPMENT;

      if (!useDev) {
        await authApi.logoutFromAmuz();
        return {
          success: false,
          account: Account.empty(),
        };
      }

      const devAccountInfo = this.getDevAccountInfo(isWebOS6);
      const account = await authApi.loginToAmuz(devAccountInfo);

      return { success: true, account: account };
    }
  }

  private static checkLogin(userData: Record<string, any>): boolean {
    const userNumber = userData.userNumber;

    return userNumber && userNumber.length > 0;
  }

  private static getAccountInfo(
    userEmail: string,
    userData: Record<string, any>,
    isWebOS6: boolean
  ): Record<string, any> {
    return {
      lastSignInUserNo: userData.userNumber,
      userEmail: userEmail,
      empNumber: userData.userNumber,
      ...(isWebOS6
        ? {}
        : {
            nickName: userData.profileNick,
            iconNick: userData.iconNick,
            profileBg: userData.profileBg,
          }),
    };
  }

  private static getDevAccountInfo(isWebOS6: boolean) {
    return {
      lastSignInUserNo: env.USER_NUMBER!,
      userEmail: "soo@amuz.co.kr",
      empNumber: env.USER_NUMBER!,
      ...(isWebOS6
        ? {}
        : {
            nickName: "SOOEUN01",
            iconNick: "S",
            profileBg: "#7360E7",
          }),
    };
  }

  static async callLgAccountApp({
    isLogin = true,
    authApi,
    lunaApi,
  }: {
    isLogin?: boolean;
    authApi: IAuthApi;
    lunaApi: ILunaApi;
  }): Promise<AccountServiceResult> {
    try {
      const tvInfo = selectTVSystemInfo(store.getState());

      if (!tvInfo) {
        console.warn("TV 시스템 정보가 없습니다.");
        return {
          success: false,
          account: Account.empty(),
        };
      }

      const sdkVersion = tvInfo.sdkVersion;
      const useApp24 =
        sdkVersion.startsWith("9") || sdkVersion.startsWith("10");

      const result = useApp24
        ? await lunaApi.launcAccountApp24(isLogin)
        : await lunaApi.launcAccountApp21(isLogin);

      if (!result.success) {
        return {
          success: false,
          account: Account.empty(),
        };
      }

      await new Promise((r) => setTimeout(r, 1000)); // 로그인 반영 딜레이 보정
      const fetchResult = await this.fetchAccountInfo({
        authApi: authApi,
        lunaApi: lunaApi,
      });

      return {
        success: true,
        account: fetchResult.account,
      };
    } catch (err) {
      console.error("callLgAccountApp 오류:", err);

      return {
        success: false,
        account: Account.empty(),
      };
    }
  }
}
