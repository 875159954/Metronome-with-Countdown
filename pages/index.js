import Head from "next/head";
import Timer from "../components/Timer/JS/Timer";
import Metronome from "../components/JS/Metronome";
import css from "../styles/Home.module.css";
import Layout from "../components/JS/Layout";
import ContextProvider from "/components/ContextProvider";
import Visualizer from '/components/JS/Visualizer'

export default function Home() {
  return (
    <ContextProvider>
      <Layout>
        <Timer />
        <Metronome />
      </Layout>
       <Visualizer/>
    </ContextProvider>
  );
}
