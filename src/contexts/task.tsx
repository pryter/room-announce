import React, {useContext, useEffect, useState} from "react";
import {useTaskState} from "../hooks/index/states";
import {updateTaskfromSection} from "../hooks/index/utils";

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
  const [tasks, setTasks] = useTaskState()

  useEffect(() => {
    updateTaskfromSection(setTasks, section)
  }, [section])

  const updateTask = (current: string) => {
    setSection(current)
  }

  return {
    section,
    tasks,
    updateTask
  }
}