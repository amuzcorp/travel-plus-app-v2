import LS2Request from "@enact/webos/LS2Request";
import { AppDispatch } from "../core/store";
import { setAccountState } from "../core/store/slices/accountSlice";
import {
  selectIsWebOS6,
  selectTVSystemInfo,
} from "../core/store/slices/tvSystemSlice";
import env from "../env";

import { loginToAmuz } from "../core/api/auth";
import { appId } from "../core/constants/globalConstant";
import store from "../core/store";

const ls2 = new LS2Request();

export const fetchAccountInfo = () => async (dispatch: AppDispatch) => {
  try {
    const res: any = await new Promise((resolve, reject) => {
      ls2.send({
        service: "luna://com.webos.service.accountmanager",
        method: "getLoginUserData",
        parameters: { serviceName: "LGE" },
        onSuccess: resolve,
        onFailure: reject,
      });
    });

    const isLoggedIn =
      res.userData.userNumber && res.userData.userNumber.length > 0;
    const isWebOS6 = selectIsWebOS6(store.getState());

    if (isLoggedIn) {
      const accountInfo = {
        isLoggedIn: true,
        lastSignInUserNo: res.userData.userNumber,
        userEmail: res.id,
        emp_number: res.userData.userNumber,
        ...(isWebOS6
          ? {}
          : {
              nickName: res.userData.profileNick,
              iconNick: res.userData.iconNick,
              profileBg: res.userData.profileBg,
            }),
      };

      // AMUZ 로그인
      await dispatch(loginToAmuz(res.userData.userNumber, accountInfo));

      return {
        success: true,
        isLoggedIn: true,
        lastSignInUserNo: res.userData.userNumber,
      };
    } else {
      dispatch(setAccountState({ isLoggedIn: false }));
      return {
        success: true,
        isLoggedIn: false,
      };
    }
  } catch (err: any) {
    console.error("계정 정보 조회 실패:", err);

    if (env.IS_LOCAL || env.IS_DEVELOPMENT) {
      const isWebOS6 = selectIsWebOS6(store.getState());
      const devAccount = {
        isLoggedIn: true,
        lastSignInUserNo: env.USER_NUMBER,
        userEmail: "soo@amuz.co.kr",
        emp_number: env.USER_NUMBER,
        ...(isWebOS6
          ? {}
          : {
              nickName: "SOOEUN01",
              iconNick: "S",
              profileBg: "#7360E7",
            }),
      };

      await dispatch(loginToAmuz(env.USER_NUMBER, devAccount));

      return {
        success: true,
        isLoggedIn: true,
        lastSignInUserNo: env.USER_NUMBER,
      };
    }

    return {
      success: false,
      message: "계정 정보 조회 실패",
      error: err,
      isLoggedIn: false,
    };
  }
};

const launchAccountApp24 = (isLogin = true): Promise<any> => {
  return new Promise((resolve) => {
    ls2.send({
      service: "luna://com.webos.applicationManager",
      method: "launchDefaultApp",
      parameters: {
        category: "MembershipApp",
        params: {
          id: appId,
          query: isLogin ? "login" : "occupyCertify",
          position: "left",
        },
      },
      onSuccess: (res: any) => resolve({ success: true, data: res }),
      onFailure: (err: any) =>
        resolve({ success: false, message: "계정 앱 실행 실패", error: err }),
    });
  });
};

const launchAccountApp21 = (isLogin = true): Promise<any> => {
  return new Promise((resolve) => {
    ls2.send({
      service: "luna://com.webos.applicationManager",
      method: "launch",
      parameters: {
        id: "com.webos.app.membership",
        params: {
          id: appId,
          query: isLogin ? "login" : "occupyCertify",
        },
      },
      onSuccess: (res: any) => resolve({ success: true, data: res }),
      onFailure: (err: any) =>
        resolve({ success: false, message: "계정 앱 실행 실패", error: err }),
    });
  });
};

export const callLgAccountApp =
  (isLogin = true) =>
  async (dispatch: AppDispatch) => {
    try {
      const tv = selectTVSystemInfo(store.getState());

      if (!tv) {
        console.warn("TV 시스템 정보가 없습니다.");
        return {
          success: false,
          isLoggedIn: false,
          message: "TV 시스템 정보를 먼저 로딩해야 합니다.",
        };
      }

      const sdkVersion = tv.sdkVersion;
      const useApp24 =
        sdkVersion.startsWith("9") || sdkVersion.startsWith("10");

      const result = useApp24
        ? await launchAccountApp24(isLogin)
        : await launchAccountApp21(isLogin);

      if (result.success) {
        await new Promise((r) => setTimeout(r, 1000)); // 로그인 반영 딜레이 보정
        const accountInfo = await dispatch(fetchAccountInfo());

        return {
          success: true,
          isLoggedIn: accountInfo.isLoggedIn,
          lastSignInUserNo: accountInfo.lastSignInUserNo,
        };
      } else {
        return {
          success: false,
          isLoggedIn: false,
          message: result.message,
        };
      }
    } catch (err) {
      console.error("callLgAccountApp 오류:", err);
      return {
        success: false,
        isLoggedIn: false,
        message: "계정 앱 실행 중 예외 발생",
      };
    }
  };
