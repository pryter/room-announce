import ContentBox from "@components/common/ContentBox";
import {DataRow} from "@components/app/Display/DataRow";
import Button from "@components/common/Button";
import {ArrowCircleDownIcon} from "@heroicons/react/solid";
import {Line} from "../../../vectors/Logo/Line";
import {useEffect, useState} from "react";
import {useTask} from "../../../contexts/task";
import classnames from "classnames"
import {motion} from "framer-motion"

const Display = () => {

  const [todoList, setTodoList] = useState({saveimg: false, line: false})
  const { section, updateTask } = useTask()

  const ex = [
    {title: "ชื่อ", context: "นายพีรดน สาเงิน"},
    {title: "เลขประจำตัว", context: "59574"},
    {title: "แผนการเรียน", context: "ศิลป์จีน"},
    {title: ["ชั้น", "ห้อง", "เลขที่"], context: ["ม.5","931", "41"]},
    {title: "ครูประจำชั้น", context: ["ครูปราถนา จันทร์ทา","ครูปีเตอร์ ชังกัส"]}
  ]

  useEffect(() => {
    if (Object.values(todoList).every(val => (val))) {
      updateTask("saved")
    }
  },[todoList])

  const regButtClick = (callback, buttType: "saveimg" | "line") => {
    callback()
    setTodoList(prevState => ({...prevState, [buttType]: true}))
  }

  const saveImg = () => {
    regButtClick(() => {

    },"saveimg")
  }

  const joinLine = () => {
    regButtClick(() => {

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
            ex.map((item, index) => {
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