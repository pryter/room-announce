import {CheckIcon, RewindIcon} from "@heroicons/react/solid";
import classnames from "classnames"
import {useTask} from "../../../contexts/task";

export const StatusItem = ({ taskStatus, selfSection, index }) => {

  const {section, updateTask} = useTask()

  return (
    <div className={classnames("flex items-center border -m-px space-x-4 py-4 px-6", selfSection == "top"? "rounded-t-md" : selfSection == "bottom" && "rounded-b-md")}>
      <div className={classnames("flex justify-center items-center text-white rounded-full w-10 h-10 flex-shrink-0", taskStatus.status === "success" ? "bg-TUCMC-pink-400" : taskStatus.status === "current" ? "border-2 border-TUCMC-pink-400" : "border-2 border-gray-300")}>
        {
          taskStatus.status === "success" ? <CheckIcon className="w-6 h-6"/> : <h1 className={classnames("text-sm font-medium", taskStatus.status === "current" ? "text-TUCMC-pink-400" : "text-gray-500")}>0{index}</h1>
        }
      </div>
      <div className="flex justify-between items-center w-full">
        <h1 className={classnames(taskStatus.status === "current" ? "text-TUCMC-pink-400" : taskStatus.status === "pending" ? "text-gray-500" : "text-TUCMC-gray-900")}>{taskStatus.title}</h1>
        {index === 1 && section === "display" && <RewindIcon onClick={() => {updateTask("restart")}} className="w-5 h-5 text-TUCMC-gray-400 cursor-pointer"/>}
      </div>
    </div>
  )
}