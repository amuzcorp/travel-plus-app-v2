import { useSelector } from "react-redux";
import { AccountState } from "../core/store/slices/accountSlice";
import { Account } from "../entities/user";

// Account 인스턴스를 반환
export const useAccount = (): Account => {
  return useSelector((state: { account: AccountState }) =>
    Account.fromReduxState(state.account.accountData)
  );
};
