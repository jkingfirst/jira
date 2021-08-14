// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
import { user } from "types/user";
import { Promise } from "q";
const LOCALSTORAGE_TOKEN_KEY = "__auth_provider_token";
let BASE_API_URL = process.env.REACT_APP_API_URL;
export const getToken = () =>
  window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
export const setToken = ({ user }: { user: user }) => {
  window.localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, user.token || "");
  return user;
};
export const login = (data: { username: string; password: string }) => {
  return fetch(`${BASE_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      return await response.json();
    })
    .then((res) => {
      return setToken(res);
    });
};
export const register = (data: { username: string; password: string }) => {
  return fetch(`${BASE_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((res) => {
      return setToken(res);
    });
};
export const loginout = async () => {
  return window.localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
};
