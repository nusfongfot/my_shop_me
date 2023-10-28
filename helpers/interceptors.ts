import axios from "axios";
import { Base64 } from "js-base64";
import { getCookies, deleteCookie } from "cookies-next";
import { errorToast } from "@/utils/notification";

const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

apiFetch.interceptors.request.use(
  (request) => {
    const { token } = getCookies("token" as any) || "";
    request.headers["x-access-token"] = token;
    request.headers["x-platform"] = "WEB";
    request.headers["Accept-Language"] = "TH";
    request.headers["Content-Type"] = "application/json";
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
    request.headers["x-access-login-application"] = "WEB";
    request.headers.Authorization = `Bearer ${token}`;
    // request.headers.Authorization = `Basic ${Base64.encode(
    //   process.env.NEXT_PUBLIC_BASICUSER +
    //     ":" +
    //     process.env.NEXT_PUBLIC_BASICPASS
    // )}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiFetch;
