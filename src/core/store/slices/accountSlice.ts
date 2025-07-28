import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
  isLoggedIn: boolean;
  lastSignInUserNo?: string;
  userEmail?: string;
  nickName?: string;
  iconNick?: string;
  profileBg?: string;
  emp_number?: string;
}

const initialState: AccountState = {
  isLoggedIn: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountState(state, action: PayloadAction<Partial<AccountState>>) {
      if (action.payload.isLoggedIn === false) {
        return initialState;
      }
      return { ...state, ...action.payload };
    },
  },
});

export const { setAccountState } = accountSlice.actions;

export const selectAccount = (state: { account: AccountState }) =>
  state.account;

export const selectIsLoggedIn = (state: { account: AccountState }) =>
  state.account.isLoggedIn;
