import ContentBox from "@components/common/ContentBox";
import {ChevronRightIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion"
import Button from "@components/common/Button";
import {useTask} from "../../contexts/task";
import {useState} from "react";
import classnames from "classnames"

export const StudentID = () => {

  const [stdID, setStdID] = useState("")
  const { section, updateTask } = useTask()

  const send = () => {
    updateTask("credentials")
  }

  return (
    <motion.div className={classnames(section !== "stdID" && "hidden")}>
      <ContentBox className="flex justify-center items-center py-10 mt-6">
        <div className="relative">
          <input
            type="text"
            onChange={(event) => {setStdID(event.target.value)}}
            className="focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 block w-56 rounded-none rounded-full px-4 h-11 border-gray-300 placeholder-TUCMC-gray-400"
            placeholder="เลขประจำตัวนักเรียน"
          />
          <Button onClick={send} className="absolute bg-TUCMC-pink-400 w-11 h-11 rounded-full flex items-center justify-center top-0 right-0 cursor-pointer">
            <ChevronRightIcon className="w-5 h-5 text-white"/>
          </Button>
        </div>
      </ContentBox>
    </motion.div>
  )
}