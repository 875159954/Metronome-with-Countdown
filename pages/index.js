import Head from "next/head";
import Timer from "../components/Timer/JS/Timer";
import Metronome from "../components/JS/Metronome";
import css from "../styles/Home.module.css";
import Banner from "/components/JS/Banner";
import Layout from "../components/JS/Layout";
import ContextProvider from "/components/JS/ContextProvider";
import Todo from "../components/Todo/JS/Todo";
import NightShift from "../components/JS/NightShift";
import MobileView from "../components/JS/MobileView";

export default function Home() {
  return (
    <ContextProvider>
      <Head>
        <link rel="apple-touch-icon-precomposed" href="/metronome/leaf.png" />
        <link rel="shortcut icon" href="/metronome/leaf.png" />
      </Head>
      <Layout>
        <Metronome />
        <Timer />
        <Todo />
      </Layout>
      <Banner postState="success" />
      {/* <MobileView>
        <Metronome />
        <Timer />
        <Todo />
      </MobileView> */}
      <NightShift />
    </ContextProvider>
  );
}
