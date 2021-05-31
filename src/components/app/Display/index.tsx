import ContentBox from "@components/common/ContentBox";
import {DataRow} from "@components/app/Display/DataRow";
import Button from "@components/common/Button";
import {ArrowCircleDownIcon, ArrowCircleLeftIcon, ArrowLeftIcon} from "@heroicons/react/solid";
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
    if (data && data.url) {
      const canvas = document.getElementById('qrCode')
      QRCode.toCanvas(canvas, `${data.url}`, {errorCorrectionLevel: 'M', margin: 0, width: 152, color: {dark: "#4A5568"}})
    }
  }, [data])

  useEffect(() => {

    if ("prefix" in data) {
      setParsedData([
        {title: "ชื่อ", context: `${data.prefix}${data.firstname} ${data.lastname}`},
        {title: "เลขประจำตัวสอบ", context: data.stdID},
        {title: "แผนการเรียน", context: `${data.branch}${data.tag}`},
        {title: "ข้อมูลห้อง ZOOM", context: [`Meeting ID: ${data.meetID}`, `Password: ${data.password}`]}
      ])
    }
  }, [data])

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
        </div>
        <div className="space-y-8">
          <canvas className="mx-auto mb-4" id="qrCode"/>
          <div className="text-[13px] flex flex-row space-x-1">
            <span className="text-gray-700 font-medium">URL: </span>
            <a target="_blank" href={data.url} className="break-all cursor-pointer text-TUCMC-gray-700 hover:text-blue-600 hover:underline z-30">{data.url}</a>
          </div>
          <div>
            <div className="flex space-x-1 text-gray-700 font-medium text-sm">
              <span>*</span>
              <div>
                <p>
                  กิจกรรม PAE จะเริ่มในวัน พุธ ที่ 2 มิถุนายน 2564
                </p>
                <p>
                  เวลา 08.00 - 15.10 น.
                </p>
              </div>
            </div>
            <div className="flex space-x-1 text-gray-700 font-medium text-sm">
              <span>*</span>
              <div>
                <p>นักเรียนควรเข้า Zoom ก่อนเวลา 08.30น.</p>
              </div>
            </div>
          </div>
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
                  <Button
                          className="flex justify-center items-center space-x-2.5 border border-TUCMC-green-500 rounded-md text-TUCMC-green-500 px-4 py-2.5 w-[152px] cursor-pointer">
                    <LoginIcon className="w-5 h-5"/>
                    <h1 className="font-medium text-lg">เข้าร่วม</h1>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
            <div className="space-y-2.5">
              <motion.div variants={updown} animate={qrState ? "down" : "up"} initial={false} transition={{delay: 0.01, duration: 0.5}}>
                <Button onClick={back}
                        className="flex justify-center items-center space-x-2.5 border border-TUCMC-gray-500 rounded-md text-TUCMC-gray-500 px-4 py-5 w-full cursor-pointer">
                  <ArrowCircleLeftIcon className="w-5 h-5"/>
                  <h1 className="font-medium text-lg">ออกจากระบบ</h1>
                </Button>
              </motion.div>
              <motion.div variants={updown} animate={qrState ? "down" : "up"} initial={false} transition={{delay: 0.05, duration: 0.5}}>
                {(section === "display" || section === "saved") && <Footer report={report}/>}
              </motion.div>
            </div>
          </div>
    </div>
  )
}

export default Display