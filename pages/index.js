import Head from "next/head";
import Timer from "../components/Timer/JS/Timer";
import Metronome from "../components/JS/Metronome";
import css from "../styles/Home.module.css";
import Layout from "../components/JS/Layout";
import ContextProvider from "/components/JS/ContextProvider";
import Visualizer from "/components/JS/Visualizer";
import MuteButton from "../components/JS/MuteButton";
import Todo from "../components/JS/Todo";

export default function Home() {
  return (
    <ContextProvider>
      <Head>
        <link rel="apple-touch-icon-precomposed" href="/metronome/leaf.png" />
        <link rel="shortcut icon" href="/metronome/leaf.png" />
      </Head>
      <Layout>
        <div style={{ position: "absolute", right: 0, bottom: 0 }}>
          <MuteButton />
        </div>
        <Metronome />
        <Timer />
        <Todo />
      </Layout>
      <Visualizer />
    </ContextProvider>
  );
}
