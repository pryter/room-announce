import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import "@styles/tailwind.css"
import Head from "next/head";
import {ToastProvider} from "@components/common/Toast/ToastContext";
import {TaskProvider} from "../contexts/task";
import {getTime, getUTC7} from "../configs/timer";
import Router from "next/router";

const App = ({Component, pageProps}: AppProps) => {

  useEffect(() => {
    const lim = getTime()
    const current = getUTC7()

    if (lim - current >= 0) {
      setTimeout(() => {
        Router.reload()
      },lim - current)
    }

  },[])

  return (
    <div className="antialiased font-display">
      <Head>
        <title>ระบบประกาศห้องเรียน โรงเรียนเตรียมอุดมศึกษา</title>
      </Head>
      <ToastProvider>
        <TaskProvider>
          <Component {...pageProps} />
        </TaskProvider>
      </ToastProvider>
    </div>)

}

export default App