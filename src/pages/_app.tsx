import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import "@styles/tailwind.css"
import Head from "next/head";
import {ToastProvider} from "@components/common/Toast/ToastContext";
import {TaskProvider} from "../contexts/task";

const App = ({Component, pageProps}: AppProps) => {

  return (
    <div className="antialiased font-display">
      <Head>
        <title>ระบบประกาศห้อง ZOOM สำหรับงาน PAE โรงเรียนเตรียมอุดมศึกษา</title>
      </Head>
      <ToastProvider>
        <TaskProvider>
          <Component {...pageProps} />
        </TaskProvider>
      </ToastProvider>
    </div>)

}

export default App