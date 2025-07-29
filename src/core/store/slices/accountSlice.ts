import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User 타입 정의(by AMUZ)
export interface User {
  id: number;
  uuid: string;
  emp_number: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

// Account 상태 정의(by LG)
export interface AccountState {
  isLoggedIn: boolean;
  lastSignInUserNo?: string;
  userEmail?: string;
  nickName?: string;
  iconNick?: string;
  profileBg?: string;
  emp_number?: string;
  token?: string;
  user?: User;
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
