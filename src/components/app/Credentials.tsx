import ContentBox from "@components/common/ContentBox";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {useTask} from "../../contexts/task";
import {motion} from "framer-motion";
import classnames from "classnames"

export const Credentials = () => {

  const {section, updateTask} = useTask()

  const send = () => {
    updateTask("display")
  }

  return (
    <motion.div className={classnames(section !== "credentials" && "hidden")}>
      <ContentBox className="flex flex-col justify-center py-10 px-9 mt-6 space-y-3">
        <div className="space-y-1">
          <h1 className="text-gray-700">ชื่อจริง</h1>
          <Input/>
        </div>
        <div className="space-y-1">
          <h1 className="text-gray-700">นามสกุล</h1>
          <Input/>
        </div>
        <div className="space-y-1">
          <h1 className="text-gray-700">เบอร์โทรศัพท์</h1>
          <Input/>
        </div>
        <div className="flex justify-end w-full">
          <Button onClick={send}
                  className="bg-TUCMC-pink-400 px-8 py-2 rounded-full flex items-center text-white justify-center cursor-pointer mt-4">
            <h1>ถัดไป</h1>
          </Button>
        </div>
      </ContentBox>
    </motion.div>
  )
}