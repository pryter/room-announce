import ContentBox from "@components/common/ContentBox";
import {DataRow} from "@components/app/Display/DataRow";
import Button from "@components/common/Button";
import {ArrowCircleDownIcon} from "@heroicons/react/solid";
import {Line} from "../../../vectors/Logo/Line";
import {useEffect, useState} from "react";
import {useTask} from "../../../contexts/task";
import classnames from "classnames"
import {motion} from "framer-motion"

const Display = ({ data }) => {

  const [todoList, setTodoList] = useState({saveimg: false, line: false})
  const { section, updateTask } = useTask()
  const [parsedData, setParsedData] = useState([])

  useEffect(() => {

    if ("prefix" in data) {
      setParsedData([
        {title: "ชื่อ", context: `${data.prefix}${data.firstname} ${data.lastname}`},
        {title: "เลขประจำตัว", context: data.stdID},
        {title: "แผนการเรียน", context: data.branch},
        {title: ["ชั้น", "ห้อง", "เลขที่"], context: [data.level,data.room, data.number]},
        {title: "ครูประจำชั้น", context: data.teacher}
      ])
    }
  },[data])

  useEffect(() => {
    if (Object.values(todoList).every(val => (val))) {
      updateTask("saved")
    }
  },[todoList])

  const regButtClick = (callback, buttType: "saveimg" | "line") => {
    callback()
    setTodoList(prevState => ({...prevState, [buttType]: true}))
  }

  const donwloadPDF = (room ,branch) => {
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
    },"saveimg")
  }

  const joinLine = () => {
    regButtClick(() => {
      linePopUp(data.lineURL)
    },"line")
  }

  return (
    <motion.div className={classnames((section !== "display" && section !== "saved") && "hidden")}>
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
      </ContentBox>
      <div className="flex space-x-2.5 mt-8">
        <Button onClick={saveImg} className="flex justify-center items-center space-x-2.5 border border-TUCMC-gray-500 rounded-md text-TUCMC-gray-500 px-4 py-5 w-1/2 cursor-pointer">
          <ArrowCircleDownIcon className="w-5 h-5"/>
          <h1 className="font-medium text-lg">ตารางสอน</h1>
        </Button>
        <Button onClick={joinLine} className="flex justify-center items-center space-x-2.5 border border-TUCMC-green-500 rounded-md text-TUCMC-green-500 px-4 py-5 w-1/2 cursor-pointer">
          <Line className="w-5 h-5"/>
          <h1 className="font-medium text-lg">กลุ่มไลน์</h1>
        </Button>
      </div>
    </motion.div>
  )
}

export default Display