import ContentBox from "@components/common/ContentBox";
import {DataRow} from "@components/app/Display/DataRow";
import Button from "@components/common/Button";
import {ArrowCircleDownIcon, ArrowCircleLeftIcon, ArrowLeftIcon, DocumentTextIcon} from "@heroicons/react/solid";
import {LoginIcon} from "@heroicons/react/outline";
import {Line, LineQR} from "../../../vectors/Logo/Line";
import {useEffect, useState} from "react";
import {useTask} from "../../../contexts/task";
import classnames from "classnames"
import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion"
import QRCode from 'qrcode'
import Modal from "@components/common/Modals";
import {Footer} from "@components/common/Footer";

const Display = ({data, setRev, report }) => {

  const [todoList, setTodoList] = useState({saveimg: false, line: false})
  const {section, updateTask} = useTask()
  const [qrState, setQrState] = useState(false)
  const [parsedData, setParsedData] = useState([])

  useEffect(() => {
    if (data && data.lineURL) {
      const canvas = document.getElementById('qrCode')
      QRCode.toCanvas(canvas, `${data.lineURL}`, {errorCorrectionLevel: 'M', margin: 0, width: 152, color: {dark: "#4A5568"}})
    }
  }, [data])

  useEffect(() => {

    if ("prefix" in data) {
      setParsedData([
        {title: "ชื่อ", context: `${data.prefix}${data.firstname} ${data.lastname}`},
        {title: "เลขประจำตัว", context: data.stdID},
        {title: "แผนการเรียน", context: data.branch},
        {title: ["ชั้น", "ห้อง", "เลขที่"], context: [data.level, data.room, data.number]},
        {title: "ครูประจำชั้น", context: data.teacher}
      ])
    }
  }, [data])

  useEffect(() => {
    if (Object.values(todoList).every(val => (val))) {
      updateTask("saved")
    }
  }, [todoList])

  const regButtClick = (callback, buttType: "saveimg" | "line") => {
    callback()
    setTodoList(prevState => ({...prevState, [buttType]: true}))
  }

  const donwloadPDF = (room, branch) => {
    const a = document.createElement("a")
    a.href = `/user/schedules/${room}.jpg`
    a.download = `${room} ${branch}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const linePopUp = (link) => {
    const a = document.createElement("a")
    a.href = `${link}`
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const saveImg = () => {
    regButtClick(() => {
      donwloadPDF(data.room, data.branch)
    }, "saveimg")
  }

  const loadPDF = () => {
    const a = document.createElement("a")
    a.href = `/user/pae.pdf`
    a.download = `เอกสาร PAE 2564.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const joinLine = () => {
    regButtClick(() => {
      linePopUp(data.lineURL)
    }, "line")
  }

  const reveal = () => {
    setQrState(prev => (!prev))
  }

  const back = () => {
    setRev()
    updateTask("restart")
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
      y: -255,
      clipPath: "inset(103% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2
      }
    }
  };

  const updown = {
    up: {
      y: -252
    },
    down: {
      y:0
    }
  }

  return (
    <div>
      <ContentBox className="pt-10 pb-14 px-6 space-y-8">
        <div>
          <h1 className="text-2xl text-gray-700 font-medium">ข้อมูลนักเรียน</h1>
        </div>
        <div className="border border-b border-TUCMC-gray-800 w-16"></div>
        <div className="space-y-2">
          {
            parsedData.length > 0 && parsedData.map((item, index) => {
              return <DataRow key={`row-${index}`} data={item}/>
            })
          }
          {data.accounts && <><div className="space-y-1.5 pt-4"><h1 className="text-gray-700 font-medium">อีเมลโรงเรียน</h1>
            <div className="space-y-1"><p className="text-TUCMC-gray-600">{data.accounts.mails.prefix}@student.triamudom.ac.th</p>
              <p className="text-TUCMC-gray-600">Password: {data.accounts.mails.password}</p>
              <p className="text-TUCMC-gray-600 pt-2">{data.accounts.mails.prefix}@365.triamudom.ac.th</p>
              <p className="text-TUCMC-gray-600">Password: {data.accounts.mails.password}</p></div>
          </div>
            <div className="space-y-1.5 pt-4"><h1 className="text-gray-700 font-medium">รหัส Wi-Fi</h1>
            <div className="space-y-1"><p className="text-TUCMC-gray-600">Username: {data.accounts.wifi.user}</p>
            <p className="text-TUCMC-gray-600">Password: {data.accounts.wifi.password}</p></div>
            </div>
          </>}
        </div>
      </ContentBox>
          <div className="space-y-2.5">
            <motion.div className="my-4">
              <motion.div animate={qrState ? "open" : "closed"}
                          transition={{duration: 0.5}}
                          initial={false}
                          variants={slide}
              >
                <div className={classnames("flex flex-col items-center bg-white w-full py-4 shadow-md rounded-md mt-2 space-y-2")}>
                  <div className="relative w-[152px] h-[152px]">
                    <canvas id="qrCode"></canvas>
                    <div className="absolute w-[152px] h-[152px] flex items-center justify-center top-0 left-0">
                      <LineQR className="w-8 h-8"/>
                    </div>
                  </div>
                  <Button onClick={joinLine}
                          className="flex justify-center items-center space-x-2.5 border border-TUCMC-green-500 rounded-md text-TUCMC-green-500 px-4 py-2.5 w-[152px] cursor-pointer">
                    <LoginIcon className="w-5 h-5"/>
                    <h1 className="font-medium text-lg">เข้าร่วม</h1>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
            <div className="space-y-2.5">
              <motion.div variants={updown} animate={qrState ? "down" : "up"} initial={false} transition={{duration: 0.5}} className="flex space-x-2.5 mt-6">
                <Button onClick={saveImg}
                        className="flex justify-center items-center space-x-2.5 border border-TUCMC-gray-600 rounded-md text-TUCMC-gray-600 px-4 py-5 w-1/2 cursor-pointer">
                  <ArrowCircleDownIcon className="w-5 h-5"/>
                  <h1 className="font-medium text-lg">ตารางเรียน</h1>
                </Button>
                <Button onClick={reveal}
                        className="flex justify-center items-center space-x-2.5 border border-TUCMC-green-500 rounded-md text-TUCMC-green-500 px-4 py-5 w-1/2 cursor-pointer">
                  <Line className="w-5 h-5"/>
                  <h1 className="font-medium text-lg">กลุ่มไลน์</h1>
                </Button>
              </motion.div>
              <motion.div variants={updown} animate={qrState ? "down" : "up"} initial={false} transition={{delay: 0.01, duration: 0.5}}>
                <Button onClick={loadPDF}
                        className="flex justify-center items-center space-x-2.5 border border-TUCMC-gray-600 rounded-md text-TUCMC-gray-600 px-4 py-5 w-full cursor-pointer">
                  <DocumentTextIcon className="w-5 h-5"/>
                  <h1 className="font-medium text-lg">เอกสาร PAE ย้อนหลัง</h1>
                </Button>
              </motion.div>
              <motion.div variants={updown} animate={qrState ? "down" : "up"} initial={false} transition={{delay: 0.04, duration: 0.5}}>
                <Button onClick={back}
                        className="flex justify-center items-center space-x-2.5 mt-12 border border-TUCMC-gray-500 rounded-md text-TUCMC-gray-500 px-4 py-5 w-full cursor-pointer">
                  <ArrowCircleLeftIcon className="w-5 h-5"/>
                  <h1 className="font-medium text-lg">ออกจากระบบ</h1>
                </Button>
              </motion.div>
              <motion.div variants={updown} animate={qrState ? "down" : "up"} initial={false} transition={{delay: 0.09, duration: 0.5}}>
                {(section === "display" || section === "saved") && <Footer report={report} padding={false}/>}
              </motion.div>
            </div>
          </div>
    </div>
  )
}

export default Display