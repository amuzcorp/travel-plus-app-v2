import { HomeApiProvider } from "./home/HomeApiProvider";

export default ({ children }: { children: React.ReactNode }) => {
  return <HomeApiProvider>{children}</HomeApiProvider>;
};
