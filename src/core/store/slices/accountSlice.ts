import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../../entities/user";

export interface AccountState {
  accountData: ReturnType<Account["toReduxState"]>;
}

const initialState: AccountState = {
  accountData: Account.empty().toReduxState(),
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Account 인스턴스를 받아 순수 객체로 변환해 저장
    setAccountState(_, action: PayloadAction<Account>) {
      return {
        accountData: action.payload.toReduxState(),
      };
    },

    // 초기화
    resetAccountState() {
      return {
        accountData: Account.empty().toReduxState(),
      };
    },
  },
});

export const { setAccountState, resetAccountState } = accountSlice.actions;

// Account 인스턴스로 다시 변환
export const selectAccount = (state: { account: AccountState }) =>
  Account.fromReduxState(state.account.accountData);

export const selectIsLoggedIn = (state: { account: AccountState }) =>
  Account.fromReduxState(state.account.accountData).isLoggedIn;
