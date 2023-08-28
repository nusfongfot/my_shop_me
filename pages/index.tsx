import BestDeals from "@/components/bestDeal";
import Header from "@/components/header";
import Layout from "@/components/layout";
import News from "@/components/news";
import BackToTop from "@/components/scollTop";
import SubscribeNews from "@/components/subscribe";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Scorpion_Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackToTop />
      <Header />
      <BestDeals />
      <News />
      <SubscribeNews />
    </>
  );
}