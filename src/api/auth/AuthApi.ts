import { Account } from "../../entities/user";
import { setAccountState } from "../../store/slices/accountSlice";
import IAuthApi, { LoginResponse } from "./iAuthApi";

export default class AuthApi extends IAuthApi {
  async loginToAmuz(
    extraState?: Partial<
      Pick<
        Parameters<typeof setAccountState>[0],
        | "userEmail"
        | "empNumber"
        | "lastSignInUserNo"
        | "nickName"
        | "iconNick"
        | "profileBg"
      >
    >
  ): Promise<Account> {
    try {
      const res = await this.post<{ data?: LoginResponse }>(
        `${this.PREFIX}/login`,
        { emp_number: extraState?.empNumber }
      );

      const { token, user } = res.data || {};

      if (!token || !user) {
        throw new Error("로그인 응답에 토큰 또는 유저 정보가 없습니다.");
      }

      return Account.fromJson({ ...user, token }, extraState);
    } catch (error) {
      console.error("AMUZ 서버 로그인 실패:", error);
      return Account.empty();
    }
  }

  async logoutFromAmuz(): Promise<void> {
    try {
      await this.post(`${this.PREFIX}/logout`, {}, true); // Bearer 토큰 포함 요청
    } catch (error) {
      console.error("AMUZ 서버 로그아웃 실패:", error);
    }
  }
}
