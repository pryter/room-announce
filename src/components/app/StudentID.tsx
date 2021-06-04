import ContentBox from "@components/common/ContentBox";
import {ChevronRightIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion"
import Button from "@components/common/Button";
import {useTask} from "../../contexts/task";
import {useRef, useState} from "react";
import classnames from "classnames"
import {request} from "@utils/request";
import {useToast} from "@components/common/Toast/ToastContext";
import {useSubmit} from "../../hooks/submitForms";
import {Spinner} from "../../vectors/Loaders/Spinner";
import {scheduled} from "../../configs/timer";

export const StudentID = ({updateCred, report}) => {

  const [stdID, setStdID] = useState("")
  const [warning, setWarning] = useState(false)
  const {updateTask} = useTask()
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
            color: "red", icon: "cross", text: scheduled("กรุณาลองกรอกใหม่อีกครั้ง รหัสนักเรียนจะต้องมีความยาว 5 หลักและเป็นตัวเลขทั้งหมด","กรุณาลองกรอกใหม่อีกครั้ง รหัสนักเรียนจะต้องมีความยาว 5 หลักหากเป็นรหัสประจำตัวสอบจะต้องมีความยาว 7 หลักและเป็นตัวเลขทั้งหมด"),
            theme: "modern", title: scheduled("รหัสนักเรียนไม่ถูกต้อง","รหัสนักเรียนหรือรหัสประจำตัวสอบไม่ถูกต้อง")
          })
          setWarning(true)
          break
        case "missing_stdID":
          addToast({
            color: "red", icon: "cross", text: <span>กรุณาลองกรอกใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถข้อแก้ไขข้อมูลได้<span onClick={report} className="text-TUCMC-pink-400 underline">ที่นี่</span></span>,
            theme: "modern", title: "ไม่พบรหัสนักเรียนนี้ในฐานข้อมูล"
          })
          setWarning(true)
          break
        default:
          addToast({
            color: "red", icon: "cross", text: <span>กรุณาลองกรอกใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถรายงานปัญหาได้<span onClick={report} className="text-TUCMC-pink-400 underline">ที่นี่</span></span>,
            theme: "modern", title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ"
          })
      }
    }
  })

  return (
    <ContentBox className="flex justify-center items-center py-10 mt-6">
      <form onSubmit={submitFunc}>
        <div className="relative">
          {scheduled(<input
            type="text"
            onChange={(event) => {
              setStdID(event.target.value)
            }}
            onFocus={() => {
              setWarning(false)
            }}
            className={classnames("appearance-none outline-none block w-56 rounded-full px-4 h-11 placeholder-TUCMC-gray-400", warning ? "border-red-500 focus:ring-TUCMC-red-500 focus:border-TUCMC-red-500" : "border-gray-300 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500")}
            placeholder="เลขประจำตัวนักเรียน"
            required
          />, <input
            type="text"
            onChange={(event) => {
              setStdID(event.target.value)
            }}
            onFocus={() => {
              setWarning(false)
            }}
            className={classnames("appearance-none outline-none block w-56 rounded-full px-4 h-11 placeholder-TUCMC-gray-400", warning ? "border-red-500 focus:ring-TUCMC-red-500 focus:border-TUCMC-red-500" : "border-gray-300 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500")}
            placeholder="เลขประจำตัวสอบ / นักเรียน"
            required
          />)}
          <Button type="submit"
                  disabled={loading}
                  className={classnames("absolute w-11 h-11 rounded-full flex items-center justify-center top-0 right-0 cursor-pointer", loading ? "" : "bg-TUCMC-pink-400")}>
            <ChevronRightIcon className={classnames("w-5 h-5 text-white", loading && "hidden")}/>
            <Spinner className={classnames("w-9 h-9", !loading && "hidden")}/>
          </Button>
        </div>
      </form>
    </ContentBox>
  )
}