import {TriamUdom} from "../vectors/Logo/TriamUdom";
import {Heading} from "@components/common/Heading";
import StatusBox from "@components/common/StatusBox";
import ContentBox from "@components/common/ContentBox";
import {StudentID} from "@components/app/StudentID";
import {useEffect, useRef, useState} from "react";
import {useTaskState} from "../hooks/index/states";
import {updateTaskfromSection} from "../hooks/index/utils";
import {TaskProvider, useTask} from "../contexts/task";
import {Credentials} from "@components/app/Credentials";
import Display from "@components/app/Display";
import Image from "next/image"
import {request} from "@utils/request";
import {Footer} from "@components/common/Footer";
import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion";
import {Report} from "@components/app/Report";
import classnames from "classnames"
import {useWindowDimensions} from "@utils/document";
import {scrollTo} from 'scroll-js';

export default function Index() {

  const [cred, updateCred] = useState({})
  const [display, setDisplay] = useState({})
  const [revAnimation, setRevAnimation] = useState(false)
  const [hide, setHide] = useState(false)
  const [slideOffset, setSlideOffset] = useState(0)
  const [resetRev, setResetRev] = useState(0)

  const mainDivRef = useRef(null)

  const {width} = useWindowDimensions()

  const {section, updateTask} = useTask()

  useEffect(() => {
    const fetch = async () => {
      const res = await request("data", "fetchPrevData", {})
      if (res.status) {
        setDisplay(res.data)
        updateTask("display")
      }
    }

    fetch()
  }, [])

  const variants = {
    initial: {opacity: 0, x: (200 + slideOffset) * (revAnimation ? -1 : 1)},
    animate: {opacity: 1, x: 0},
    exit: {opacity: 0, x: (-200 - slideOffset) * (revAnimation ? -1 : 1)}
  }

  const slide = {
    open: (height = 1000) => ({
      y: 0,
      clipPath: "inset(0% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2
      }
    }),
    closed: {
      y: -155,
      clipPath: "inset(100% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2
      }
    }
  };

  const updown = {
    up: {
      y: -252,
      transition: {
        delay: 0.9,
        duration: 0.5
      }
    },
    down: {
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  useEffect(() => {
    if (mainDivRef) {
      const divWidth = mainDivRef.current.clientWidth
      const imgOffset = width >= 1024 ? 431 : 0

      if ((width - divWidth - imgOffset) / 2 - 200 < 0) {
        setSlideOffset((width - imgOffset - divWidth) / 2 - 200)
      } else {
        setSlideOffset(0)
      }
    }
  }, [width])

  const report = () => {
    setHide(true)
    updateTask("report")
  }

  useEffect(() => {
    if (resetRev >= 2) {
      setRevAnimation(false)
    }
  }, [resetRev])

  const doRev = () => {
    setResetRev(0)
    setRevAnimation(true)
  }

  const start = () => {
    if (width >= 1024) {
      console.log("e")
    }
  }

  return (
    <div className="lg:flex lg:min-h-[1600px]">
      <div className="flex-shrink hidden lg:block w-[431px] relative min-h-screen">
        <Image src="/assets/images/splash.jpg" layout="fill" className="object-cover"/>
      </div>
      <div className="lg:mx-auto lg:px-6">
        <div className="pt-12 pb-20 space-y-6 px-6 max-w-[405px] mx-auto lg:min-w-[405px] lg:mt-20">
          <div className="space-y-8">
            <Heading/>
            {<motion.div animate={!hide ? "open" : "closed"}
                         transition={{duration: 0.5}}
                         initial={false}
                         variants={slide}
            >
              <StatusBox/>
            </motion.div>}
          </div>
          <motion.div animate={hide ? "up" : "down"} variants={updown} onAnimationStart={hide && start}>
            <AnimateSharedLayout>
              <AnimatePresence exitBeforeEnter={true} initial={false}>
                <motion.div initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={variants}
                            ref={mainDivRef}
                            transition={{duration: (200 + (slideOffset / 2)) / 400}}
                            onAnimationComplete={() => {
                              setResetRev(prev => (prev + 1))
                            }}
                            key={section === "saved" ? "display" : section}
                >
                  {section === "stdID" && <StudentID updateCred={updateCred} report={report}/>}
                  {section === "credentials" && <Credentials userCred={cred} setDisplay={setDisplay} report={report} setRev={doRev}/>}
                  {(section === "display" || section === "saved") && <Display data={display} setRev={doRev} report={report}/>}
                  {section === "report" && <Report setHide={setHide} setRev={doRev}/>}
                </motion.div>
              </AnimatePresence>
              {section !== "report" && !(section === "display" || section === "saved") && <motion.div layout="position">
                  <Footer report={report}/>
              </motion.div>}
            </AnimateSharedLayout>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
