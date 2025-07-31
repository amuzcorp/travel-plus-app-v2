import { AuthApiProvider } from "./auth/AuthApiProvider";
import { HomeApiProvider } from "./home/HomeApiProvider";
import { LunaApiProvider } from "./luna/LunaApiProvider";

const ApiProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LunaApiProvider>
      <AuthApiProvider>
        <HomeApiProvider>{children}</HomeApiProvider>
      </AuthApiProvider>
    </LunaApiProvider>
  );
};

export default ApiProviders;
