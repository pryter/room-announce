import ContentBox from "@components/common/ContentBox";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {useTask} from "../../contexts/task";
import classnames from "classnames"
import {useEffect, useState} from "react";
import crypto from "crypto";
import {useSubmit} from "../../hooks/submitForms";
import {useToast} from "@components/common/Toast/ToastContext";
import {request} from "@utils/request";
import {ArrowCircleLeftIcon} from "@heroicons/react/solid";
import {Ellipsis} from "../../vectors/Loaders/Ellipsis";
import {fixGrammar} from "@utils/text";

export const Credentials = ({userCred, setDisplay, report, setRev}) => {

  const {section, updateTask} = useTask()
  const [lastname, setLastname] = useState("")
  const [lastnameStat, setLastnameStat] = useState("")
  const [phone, setPhone] = useState("")
  const {addToast} = useToast()

  const clear = () => {
    setLastname("")
    setPhone("")
    setLastnameStat("")
  }

  useEffect(() => {
    if (section === "stdID") {
      clear()
    }
  }, [section])

  const {loading, submitFunc} = useSubmit(async () => {
    if (lastnameStat !== "correct") return addToast({
      color: "red", icon: "cross", text: <span>นามสกุลไม่ตรงกับข้อมูลบนฐานข้อมูล หากยังพบข้อผิดพลาดสามารถข้อแก้ไขข้อมูลได้<span onClick={report} className="text-TUCMC-pink-400 underline">ที่นี่</span></span>,
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
    } else {
      switch (res.report) {
        case "invalid_stdID":
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง รหัสนักเรียนจะต้องมีความยาว 5 หลักและเป็นตัวเลขทั้งหมด",
            theme: "modern", title: "รหัสนักเรียนไม่ถูกต้อง"
          })
          break
        case "missing_stdID":
          addToast({
            color: "red", icon: "cross", text: <span>กรุณาลองกรอกใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถข้อแก้ไขข้อมูลได้<span onClick={report} className="text-TUCMC-pink-400 underline">ที่นี่</span></span>,
            theme: "modern", title: "ไม่พบรหัสนักเรียนนี้ในฐานข้อมูล"
          })
          break
        case "not_matched_lastname":
          addToast({
            color: "red", icon: "cross", text: <span>นามสกุลไม่ตรงกับข้อมูลบนฐานข้อมูล หากยังพบข้อผิดพลาดสามารถข้อแก้ไขข้อมูลได้<span onClick={report} className="text-TUCMC-pink-400 underline">ที่นี่</span></span>,
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
            color: "red", icon: "cross", text: <span>กรุณาลองกรอกใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถรายงานปัญหาได้<span onClick={report} className="text-TUCMC-pink-400 underline">ที่นี่</span></span>,
            theme: "modern", title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ"
          })
      }
    }
  })

  useEffect(() => {
    if (lastname === "") return;
    const hashed = crypto.createHash("SHA256").update(fixGrammar(lastname)).digest("base64")
    if (hashed === fixGrammar(userCred.lastname)) {
      setLastnameStat("correct");
      return
    }
    setLastnameStat("wrong")
  }, [lastname])


  const back = () => {
    setRev()
    updateTask("restart")
  }

  return (
    <ContentBox className="flex flex-col justify-center py-10 px-9 mt-6">
      <form onSubmit={submitFunc} className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-gray-700">ชื่อจริง</h1>
          <Input value={userCred.firstname} updateHandler={(d) => {
          }} disabled={true}/>
        </div>
        <div className="space-y-1">
          <h1 className="text-gray-700">นามสกุล</h1>
          <input
            type="text"
            onChange={(event) => {
              setLastname(event.target.value)
            }}
            className={classnames("appearance-none outline-none block w-full rounded-full px-4 h-11 shadow-sm placeholder-TUCMC-gray-400", lastnameStat === "wrong" ? "border-TUCMC-red-500 focus:ring-TUCMC-red-500 focus:border-TUCMC-red-500" : lastnameStat === "correct" ? "border-green-500 focus:ring-TUCMC-green-500 focus:border-TUCMC-green-500" : "border-gray-300 focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500")}
            placeholder="นามสกุล"
            value={lastname}
            required
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-gray-700">เบอร์โทรศัพท์</h1>
          <Input placeholder="0985333333" updateHandler={setPhone} value={phone} required={true}/>
        </div>
        <div className="flex justify-between items-center w-full pt-4">
          <div onClick={back} className="flex text-TUCMC-gray-600 items-center space-x-1.5 cursor-pointer">
            <ArrowCircleLeftIcon className="w-5 h-5"/>
            <h1>ย้อนกลับ</h1>
          </div>
          <Button type="submit"
                  disabled={loading}
                  className={classnames("bg-TUCMC-pink-400 px-8 py-2 rounded-full flex items-center text-white justify-center cursor-pointer", loading && "py-1.5")}>
            <h1 className={classnames(loading && "hidden")}>ถัดไป</h1>
            <Ellipsis className={classnames("w-[2.1rem] h-7", !loading && "hidden")}/>
          </Button>
        </div>
      </form>
    </ContentBox>
  )
}