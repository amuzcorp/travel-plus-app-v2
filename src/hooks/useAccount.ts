import { useSelector } from "react-redux";
import { Account } from "../entities/user";
import { AccountState } from "../store/slices/accountSlice";

// Account 인스턴스를 반환
export const useAccount = (): Account => {
  return useSelector((state: { account: AccountState }) =>
    Account.fromReduxState(state.account.accountData)
  );
};
