import { createContext, useContext } from "react";
import { useFakeData } from "../../../core/constants/globalConstant";
import FakeHomeApi from "./FakeHomeApi";
import HomeApi from "./HomeApi";
import IHomeApi from "./iHomeApi";

const HomeApiContext = createContext<IHomeApi | null>(null);

export const HomeApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const homeApi: IHomeApi = useFakeData ? new FakeHomeApi() : new HomeApi();

  return (
    <HomeApiContext.Provider value={homeApi}>
      {children}
    </HomeApiContext.Provider>
  );
};

export const useHomeApi = (): IHomeApi => {
  const context = useContext(HomeApiContext);
  if (!context) throw new Error("Error");
  return context;
};
