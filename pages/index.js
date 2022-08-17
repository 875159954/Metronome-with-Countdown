import Head from 'next/head'
import Image from 'next/image'
import Timer from '../components/Timer/JS/Timer'
import Metronome from '../components/JS/Metronome'
import Nav from '../components/JS/Nav'
import css from '../styles/Home.module.css'
import Layout from '../components/JS/Layout'

export default function Home() {
  return (
    <Layout>
      <Timer />
      <Metronome/>
    </Layout>
  )
}
