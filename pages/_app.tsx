"use client";

import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import useAuth from "@/zustand/auth";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getProfileByIDAPI } from "@/api/profile";
import { errorToast } from "@/utils/notification";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { setAuth, auth } = useAuth();
  const getAccInfo: any = getCookie("accInfo");

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined" && getAccInfo && !!auth) {
        try {
          const id = parseInt(getAccInfo);
          const res = await getProfileByIDAPI(id);
          if (res.res_code === "0000") {
            setAuth(res.results[0]);
          }
        } catch (error: any) {
          console.log("err", error);
          errorToast(error.message, 2500);
        }
      }
    })();
  }, []);
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
}
