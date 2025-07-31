import { createContext, useContext } from "react";
import { useFakeData } from "../../../core/constants/globalConstant";
import AuthApi from "./AuthApi";
import FakeAuthApi from "./FakeAuthApi";
import IAuthApi from "./iAuthApi";

const AuthApiContext = createContext<IAuthApi | null>(null);

export const AuthApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authApi: IAuthApi = useFakeData ? new FakeAuthApi() : new AuthApi();

  return (
    <AuthApiContext.Provider value={authApi}>
      {children}
    </AuthApiContext.Provider>
  );
};

export const useAuthApi = (): IAuthApi => {
  const context = useContext(AuthApiContext);
  if (!context) throw new Error("Error");
  return context;
};
