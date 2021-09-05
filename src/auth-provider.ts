// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
import { user } from "types/user";
import { http } from "./utils/httpRequest";
const LOCALSTORAGE_TOKEN_KEY = "__auth_provider_token";
export const getToken = () =>
  window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
export const setToken = ({ user }: { user: user }) => {
  window.localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, user.token || "");
  return user;
};
export const login = (data: { username: string; password: string }) => {
  return http("/login", { data, ...{ method: "POST" } }).then((res) => {
    setToken(res);
    return res;
  });
};
export const register = (data: { username: string; password: string }) => {
  return http("/register", { data, ...{ method: "POST" } }).then((res) => {
    setToken(res);
    return res;
  });
};
export const logout = async () => {
  return window.localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
};
