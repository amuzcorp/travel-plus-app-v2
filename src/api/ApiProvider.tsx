import { AuthApiProvider } from "./auth/AuthApiProvider";
import { HomeApiProvider } from "./home/HomeApiProvider";
import { LunaApiProvider } from "./luna/LunaApiProvider";

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <LunaApiProvider>
      <AuthApiProvider>
        <HomeApiProvider>{children}</HomeApiProvider>
      </AuthApiProvider>
    </LunaApiProvider>
  );
};
