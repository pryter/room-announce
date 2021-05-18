import ContentBox from "@components/common/ContentBox";
import {ChevronRightIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion"
import Button from "@components/common/Button";
import {useTask} from "../../contexts/task";
import {useState} from "react";
import classnames from "classnames"
import {request} from "@utils/request";
import {useToast} from "@components/common/Toast/ToastContext";
import MoonLoader from "react-spinners/MoonLoader"
import {useSubmit} from "../../hooks/submitForms";

export const StudentID = ({ updateCred }) => {

  const [stdID, setStdID] = useState("")
  const [warning, setWarning] = useState(false)
  const {section, updateTask} = useTask()
  const {addToast} = useToast()
  const {loading, submitFunc} = useSubmit(async () => {
    const res = await request("data", "checkID", {stdID: stdID})
    if (res.status) {
      updateCred(res.data)
      updateTask("credentials")
    } else {
      switch (res.report) {
        case "invalid_stdID":
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง รหัสนักเรียนจะต้องมีความยาว 5 ตัวอักษรและเป็นตัวเลขทั้งหมด",
            theme: "modern", title: "รหัสนักเรียนไม่ถูกต้อง"
          })
          setWarning(true)
          break
        case "missing_stdID":
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง",
            theme: "modern", title: "ไม่พบรหัสนักเรียนนี้ในฐานข้อมูล"
          })
          setWarning(true)
          break
        default:
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง",
            theme: "modern", title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ"
          })
      }
    }
  })

  return (
    <motion.div className={classnames(section !== "stdID" && "hidden")}>
      <ContentBox className="flex justify-center items-center py-10 mt-6">
        <form onSubmit={submitFunc}>
          <div className="relative">
            <input
              type="text"
              onChange={(event) => {
                setStdID(event.target.value)
              }}
              onFocus={() => {
                setWarning(false)
              }}
              className={classnames("appearance-none outline-none focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 block w-56 rounded-full px-4 h-11 border-gray-300 placeholder-TUCMC-gray-400", warning && "border-TUCMC-red-400")}
              placeholder="เลขประจำตัวนักเรียน"
              required
            />
            <Button type="submit"
                    className={classnames("absolute w-11 h-11 rounded-full flex items-center justify-center top-0 right-0 cursor-pointer", loading ? "bg-TUCMC-gray-500" : "bg-TUCMC-pink-400")}>
              <ChevronRightIcon className={classnames("w-5 h-5 text-white")}/>
            </Button>
          </div>
        </form>
      </ContentBox>
    </motion.div>
  )
}