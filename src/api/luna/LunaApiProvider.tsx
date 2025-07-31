import { createContext, useContext } from "react";
import { useFakeData } from "../../constants/globalConstant";
import FakeLunaApi from "./FakeLunaApi";
import ILunaApi from "./iLunaApi";
import LunaApi from "./LunaApi";

const LunaApiContext = createContext<ILunaApi | null>(null);

export const LunaApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const lunaApi: ILunaApi = useFakeData ? new FakeLunaApi() : new LunaApi();

  return (
    <LunaApiContext.Provider value={lunaApi}>
      {children}
    </LunaApiContext.Provider>
  );
};

export const useLunaApi = (): ILunaApi => {
  const context = useContext(LunaApiContext);
  if (!context) throw new Error("Error");
  return context;
};
