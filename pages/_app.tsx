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
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { setAuth } = useAuth();
  const getAccInfo: any = getCookie("accInfo");

  useEffect(() => {
    if (typeof window !== "undefined" && getAccInfo) {
      setAuth(JSON.parse(getAccInfo));
    }
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
