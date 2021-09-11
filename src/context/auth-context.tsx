import React from "react";
import * as auth from "auth-provider";
import { user } from "types/user";
import { ReactNode } from "react";
import { useMount } from "../utils/tools";
import { http } from "../utils/httpRequest";
import { message } from "antd";
import { useAsync } from "../utils/useAsync";
import { FullPageLoading, FullPageError } from "component/libStyle";
import { DevTools } from "jira-dev-tool";
const AuthContext = React.createContext<
  | {
      user: user | null;
      login: (data: formData) => Promise<void>;
      register: (data: formData) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";
interface formData {
  username: string;
  password: string;
}
async function initUser() {
  let user = null;
  let token = auth.getToken();
  if (token) {
    let data = await http("/me", { token });
    user = data.user;
  }
  return user;
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    error,
    data: user,
    run,
    isIdle,
    isRuning,
    isError,
    setData: setUser,
  } = useAsync<user | null>();
  // const [user, setUser] = useState<user | null>(null);
  const login = (data: formData) =>
    auth
      .login(data)
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        message.error(err.message);
      });
  const register = (data: formData) =>
    auth
      .register(data)
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        message.error(err.message);
      });
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(() => {
    // initUser().then((user) => {
    //   setUser(user);
    // }).catch(err=>{
    //   console.log(err)
    // });
    run(initUser());
  });
  if (isIdle || isRuning) {
    return <FullPageLoading></FullPageLoading>;
  }
  if (isError) {
    return (
      <>
        <DevTools />
        <FullPageError error={error}></FullPageError>;
      </>
    );
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AppProvider使用");
  }
  return context;
};
