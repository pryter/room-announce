import React, {useContext, useEffect, useState} from "react";
import {useTaskState} from "../hooks/index/states";
import {updateTaskfromSection} from "../hooks/index/utils";
import {request} from "@utils/request";
import {scheduled} from "../configs/timer";

interface TaskContext {
  section: string,
  tasks: {title: string | JSX.Element, status: string}[],
  updateTask: (current: string) => void
}

export const useTask = () => {
  return useContext(TaskContext)
}

const TaskContext = React.createContext<TaskContext | null>(null)

export const TaskProvider = ({children}) => {
  const task = taskAction()
  return <TaskContext.Provider value={task}>
    {children}
  </TaskContext.Provider>
}

const taskAction = () => {

  const [section, setSection] = useState("stdID")
  const [lastSection, setLastSection] = useState("")

  const [tasks, setTasks] = useTaskState()

  useEffect(() => {
    updateTaskfromSection(setTasks, section)
  }, [section])

  const reset = async () => {
    await request("data", "destroyCookie", {})
    setTasks([{title: scheduled("กรอกเลขประจำตัวนักเรียน", <><p>กรอกเลขประจำตัวนักเรียน</p><p>หรือ เลขประจำตัวสอบ 7 หลัก</p></>), status: "current"}, {
      title: "กรอกข้อมูลส่วนตัว", status: "pending"
    }, {title: scheduled(<><p>ดาวน์โหลดตารางเรียน</p><p>และเข้ากลุ่มไลน์ห้องเรียน</p></>, <><p>ดาวน์โหลดเอกสารที่เกี่ยวข้อง</p><p>และเข้ากลุ่มไลน์ห้องเรียน</p></>), status: "pending"}])
    setSection("stdID")
  }

  const updateTask = (current: string) => {
    if (current === "restart") {
      reset()
      return
    }

    if (current === "report") {
      setLastSection(section)
    }

    if (lastSection !== ""){
      setSection(lastSection)
      setLastSection("")
      return;
    }

    setSection(current)
  }

  return {
    section,
    tasks,
    updateTask
  }
}