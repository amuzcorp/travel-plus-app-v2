import { AppDispatch } from "../../core/store";
import { setAccountState } from "../../core/store/slices/accountSlice";
import { Account } from "../../entities/user/Account";
import { apiService } from "./apiService";

const PREFIX = "/account/emp";

// 서버 응답
interface LoginResponse {
  token: string;
  user: {
    id: number;
    uuid: string;
    emp_number: string;
    name: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    metadata: string | null;
  };
}

// AMUZ 서버 로그인
export const loginToAmuz =
  (
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
  ) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const res = await apiService.post<{ data?: LoginResponse }>(
        `${PREFIX}/login`,
        { emp_number: extraState?.empNumber }
      );

      const { token, user } = res.data || {};

      if (!token || !user) {
        dispatch(setAccountState(Account.empty()));
        throw new Error("로그인 응답에 토큰 또는 유저 정보가 없습니다.");
      }

      const account = Account.fromJson({ ...user, token }, extraState);
      dispatch(setAccountState(account));
    } catch (error) {
      dispatch(setAccountState(Account.empty()));
      console.error("AMUZ 서버 로그인 실패:", error);
      throw error;
    }
  };

// AMUZ 서버 로그아웃
export const logoutFromAmuz =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      await apiService.post(`${PREFIX}/logout`, {}, true); // Bearer 토큰 포함 요청
      dispatch(setAccountState(Account.empty()));
    } catch (error) {
      console.error("AMUZ 서버 로그아웃 실패:", error);
      dispatch(setAccountState(Account.empty()));
      throw error;
    }
  };
