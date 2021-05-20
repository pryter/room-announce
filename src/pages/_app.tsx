import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import "@styles/tailwind.css"
import Head from "next/head";

const App = ({Component, pageProps}: AppProps) => {

  return (
    <div className="antialiased font-display">
      <Head>
        <title>ระบบประกาศห้องเรียน โรงเรียนเตรียมอุดมศึกษา</title>
      </Head>
      <Component {...pageProps} />
    </div>)

}

export default App