import ContentBox from "@components/common/ContentBox";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {useTask} from "../../contexts/task";
import {motion} from "framer-motion";
import classnames from "classnames"
import {useEffect, useState} from "react";
import crypto from "crypto";
import {useSubmit} from "../../hooks/submitForms";
import {useToast} from "@components/common/Toast/ToastContext";
import {request} from "@utils/request";

export const Credentials = ({ userCred, setDisplay }) => {

  const {section, updateTask} = useTask()
  const [lastname, setLastname] = useState("")
  const [lastnameStat, setLastnameStat] = useState("")
  const [phone, setPhone] = useState("")
  const {addToast} = useToast()

  const {loading, submitFunc} = useSubmit(async () => {
    if (lastnameStat !== "correct") return addToast({
      color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง",
      theme: "modern", title: "นามสกุลไม่ตรงกับข้อมูลบนฐานข้อมูล"
    })

    if (!(phone.length >= 9 && phone.length <= 10)) return addToast({
      color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง เบอร์โทรศัพท์จะต้องมีความยาว 9 - 10 ตัวเท่านั้น",
      theme: "modern", title: "หมายเลขโทรศัพท์ไม่ถูกต้อง"
    })

    const res = await request("data", "getData", {stdID: userCred.stdID, lastname: lastname, phone: phone})

    if (res.status) {
      setDisplay(res.data)
      updateTask("display")
    }else{
      switch (res.report) {
        case "invalid_stdID":
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง รหัสนักเรียนจะต้องมีความยาว 5 ตัวอักษรและเป็นตัวเลขทั้งหมด",
            theme: "modern", title: "รหัสนักเรียนไม่ถูกต้อง"
          })
          break
        case "missing_stdID":
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง",
            theme: "modern", title: "ไม่พบรหัสนักเรียนนี้ในฐานข้อมูล"
          })
          break
        case "not_matched_lastname":
          addToast({
            color: "red", icon: "cross", text: "นามสกุลไม่ตรงกับข้อมูลบนฐานข้อมูล",
            theme: "modern", title: "กรุณาลองกรอกใหม่อีกครั้ง"
          })
          break
        case "invalid_phone":
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง เบอร์โทรศัพท์จะต้องมีความยาว 9 - 10 ตัวเท่านั้น",
            theme: "modern", title: "หมายเลขโทรศัพท์ไม่ถูกต้อง"
          })
          break
        default:
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง",
            theme: "modern", title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ"
          })
      }
    }
  })

  useEffect(() => {
    if (lastname == "") return;
    const hashed = crypto.createHash("SHA256").update(lastname).digest("base64")
    if (hashed === userCred.lastname) {
      setLastnameStat("correct");
      return
    }
    setLastnameStat("wrong")
  }, [lastname])


  return (
    <motion.div className={classnames(section !== "credentials" && "hidden")}>
      <ContentBox className="flex flex-col justify-center py-10 px-9 mt-6">
        <form onSubmit={submitFunc} className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-gray-700">ชื่อจริง</h1>
            <Input value={userCred.firstname} updateHandler={(d) => {
            }} disabled={true}/>
          </div>
          <div className="space-y-1">
            <h1 className="text-gray-700">นามสกุล</h1>
            <Input updateHandler={setLastname} placeholder="นามสกุล" value={lastname} required={true}
                   className={lastnameStat === "wrong" ? "border-TUCMC-red-500 focus:ring-TUCMC-red-500 focus:border-TUCMC-red-500" : lastnameStat === "correct" && "border-green-500 focus:ring-TUCMC-green-500 focus:border-TUCMC-green-500"}/>
          </div>
          <div className="space-y-1">
            <h1 className="text-gray-700">เบอร์โทรศัพท์</h1>
            <Input placeholder="0985333333" updateHandler={setPhone} value={phone} required={true}/>
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit"
                    className={classnames("bg-TUCMC-pink-400 px-8 py-2 rounded-full flex items-center text-white justify-center cursor-pointer mt-4", loading && "bg-TUCMC-gray-500")}>
              <h1>ถัดไป</h1>
            </Button>
          </div>
        </form>
      </ContentBox>
    </motion.div>
  )
}