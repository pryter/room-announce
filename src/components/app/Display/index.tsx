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

const Display = ({data, setRev, report}) => {

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
      y: 0
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
            <a target="_blank" href={data.url}
               className="break-all cursor-pointer text-TUCMC-gray-700 hover:text-blue-600 hover:underline z-30">{data.url}</a>
          </div>
          <div>
            <div className="flex space-x-1 text-gray-700 font-medium text-sm">
              <span>*</span>
              <div>
                <p>
                  กิจกรรม PAE จะเริ่มในวัน พุธ ที่ 2 มิถุนายน 2564
                </p>
                <p>
                  เวลา 08.00 - 16.00 น.
                </p>
              </div>
            </div>
            <div className="flex space-x-1 text-gray-700 font-medium text-sm">
              <span>*</span>
              <div>
                <p>นักเรียนควรเข้า Zoom ก่อนเวลา 08.00น.</p>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
      <div className="mt-8">
          <Button onClick={back}
                  className="flex justify-center items-center space-x-2.5 border border-TUCMC-gray-500 rounded-md text-TUCMC-gray-500 px-4 py-5 w-full cursor-pointer">
            <ArrowCircleLeftIcon className="w-5 h-5"/>
            <h1 className="font-medium text-lg">ออกจากระบบ</h1>
          </Button>
      </div>
    </div>
  )
}

export default Display