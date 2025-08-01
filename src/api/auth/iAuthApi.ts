import { setAccountState } from "src/store/slices/accountSlice";
import { Account } from "../../entities/user";
import IApi from "../iApi";

export interface LoginResponse {
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

export default abstract class IAuthApi extends IApi {
  PREFIX = "/account/emp";

  // 서버 응답
  abstract loginToAmuz(
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
  ): Promise<Account>;

  abstract logoutFromAmuz(): Promise<void>;
}
