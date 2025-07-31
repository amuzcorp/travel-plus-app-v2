import { AppDispatch } from "../../core/store";
import { setAccountState } from "../../core/store/slices/accountSlice";
// import { apiService } from "./apiService";

const PREFIX = "/account/emp";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    uuid: string;
    emp_number: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

// AMUZ 서버 로그인 함수
export const loginToAmuz =
  (
    emp_number: string,
    extraState?: Partial<
      Pick<
        Parameters<typeof setAccountState>[0],
        | "userEmail"
        | "emp_number"
        | "lastSignInUserNo"
        | "nickName"
        | "iconNick"
        | "profileBg"
      >
    >
  ) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // // const res = await apiService.post<{ data?: LoginResponse }>(
      // //   `${PREFIX}/login`,
      // //   { emp_number }
      // // );
      // const { token, user } =
      //   // res.data ||
      //   { token: "", user: "" };
      // if (!token || !user) {
      //   dispatch(setAccountState({ isLoggedIn: false }));
      //   throw new Error("로그인 응답에 토큰 또는 유저 정보가 없습니다.");
      // }
      // dispatch(
      //   setAccountState({
      //     isLoggedIn: true,
      //     token,
      //     user,
      //     ...extraState,
      //   })
      // );
    } catch (error) {
      dispatch(setAccountState({ isLoggedIn: false }));
      console.error("AMUZ 서버 로그인 실패:", error);
      throw error;
    }
  };
