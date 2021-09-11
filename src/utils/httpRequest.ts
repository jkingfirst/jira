import * as qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "../context/auth-context";

let BASE_API_URL = process.env.REACT_APP_API_URL;
interface config extends RequestInit {
  token?: string;
  data?: object;
}
export async function http(
  url: string,
  { data, token, headers, ...customConfig }: config
) {
  let setting = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  let httpUrl = "";
  if (setting.method.toUpperCase() === "GET") {
    httpUrl = `${BASE_API_URL}${url}?${qs.stringify(data)}`;
  } else if (setting.method.toUpperCase() === "POST") {
    httpUrl = `${BASE_API_URL}${url}`;
    setting["body"] = JSON.stringify(data);
  }
  return window
    .fetch(httpUrl, setting)
    .then(async (res) => {
      if (res.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      if (res.ok) {
        return await res.json();
      } else {
        return Promise.reject(await res.json());
      }
    })
    .then((res) => {
      return res;
    });
}
export const useHttp = () => {
  let { user } = useAuth();
  return (url: string, config: config) => {
    return http(url, { ...config, token: user?.token });
  };
};
