import React, { useState } from "react";
import * as auth from "auth-provider";
import { user } from "types/user";
import { ReactNode } from "react";
import { useMount } from "../utils/tools";
import { http } from "../utils/httpRequest";
const AuthContext = React.createContext<
  | {
      user: user | null;
      login: (data: formData) => Promise<void>;
      register: (data: formData) => Promise<void>;
      loginout: () => Promise<void>;
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
  const [user, setUser] = useState<user | null>(null);
  const login = (data: formData) => auth.login(data).then(setUser);
  const register = (data: formData) => auth.register(data).then(setUser);
  const loginout = () => auth.loginout().then(() => setUser(null));
  useMount(() => {
    initUser().then((user) => {
      setUser(user);
    });
  });
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, loginout }}
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
