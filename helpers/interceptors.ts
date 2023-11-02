import axios from "axios";
import { Base64 } from "js-base64";
import { getCookies, deleteCookie } from "cookies-next";
import { errorToast } from "@/utils/notification";

const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

// Before Send Request
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

    return request;
  },
  (error) => {
    console.log("errir inside", error);
    return Promise.reject(error);
  }
);

// Before Accept Response
apiFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err?.response?.data?.res_code === "5438") {
      deleteCookie("token");
      deleteCookie("accInfo");
      return window.location.replace("/");
    }
    return Promise.reject(err);
  }
);
export default apiFetch;
