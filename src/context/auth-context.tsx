import React, { useCallback } from "react";
import * as auth from "auth-provider";
import { user } from "types/user";
import { ReactNode } from "react";
import { useMount } from "../utils/tools";
import { http } from "../utils/httpRequest";
import { useAsync } from "../utils/useAsync";
import { FullPageLoading, FullPageError } from "component/libStyle";
import { DevTools } from "jira-dev-tool";
import * as authStore from "store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
export interface formData {
  username: string;
  password: string;
}
export const initUser = async () => {
  let user = null;
  let token = auth.getToken();
  if (token) {
    let data = await http("/me", { token });
    user = data.user;
  }
  return user;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, run, isIdle, isRuning, isError } = useAsync<user | null>();
  // const [user, setUser] = useState<user | null>(null);

  const dispatch: (...args: unknown[]) => Promise<user> = useAppDispatch(); // 必须显性的给dispath指定返回类型，否则报错
  useMount(() => {
    // initUser().then((user) => {
    //   setUser(user);
    // }).catch(err=>{
    //   console.log(err)
    // });
    run(dispatch(authStore.init()));
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
  return <div>{children}</div>;
};
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const login = useCallback(
    (from: formData) => dispatch(authStore.login(from)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  const register = useCallback(
    (from: formData) => dispatch(authStore.register(from)),
    [dispatch]
  );
  return {
    user,
    login,
    logout,
    register,
  };
};
