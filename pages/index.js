import Head from "next/head";
import Timer from "../components/Timer/JS/Timer";
import Metronome from "../components/JS/Metronome";
import css from "../styles/Home.module.css";
import Layout from "../components/JS/Layout";
import ContextProvider from "/components/JS/ContextProvider";
import Visualizer from '/components/JS/Visualizer'
import MuteButton from "../components/JS/MuteButton";

export default function Home() {
  return (
    <ContextProvider>
      <Layout>
        <div style={{ position: "absolute",right:0,bottom:0}}><MuteButton/></div>
        <Timer />
        <Metronome />
      </Layout>
       <Visualizer/>
    </ContextProvider>
  );
}
