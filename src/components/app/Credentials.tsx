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

const Loader = ({...restProps}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", shapeRendering: "auto"}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...restProps}>
    <circle cx="84" cy="50" r="10" fill="#ffffff">
      <animate attributeName="r" repeatCount="indefinite" dur="0.7142857142857142s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
      <animate attributeName="fill" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff" begin="0s"></animate>
    </circle><circle cx="16" cy="50" r="10" fill="#ffffff">
    <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
    <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
  </circle><circle cx="50" cy="50" r="10" fill="#ffffff">
    <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7142857142857142s"></animate>
    <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7142857142857142s"></animate>
  </circle><circle cx="84" cy="50" r="10" fill="#ffffff">
    <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.4285714285714284s"></animate>
    <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.4285714285714284s"></animate>
  </circle><circle cx="16" cy="50" r="10" fill="#ffffff">
    <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.142857142857143s"></animate>
    <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.142857142857143s"></animate>
  </circle>
  </svg>
}

export const Credentials = ({userCred, setDisplay}) => {

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
  },[section])

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
    } else {
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
    if (lastname === "") return;
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
          <div className="flex justify-end w-full">
            <Button type="submit"
                    disabled={loading}
                    className={classnames("bg-TUCMC-pink-400 px-8 py-2 rounded-full flex items-center text-white justify-center cursor-pointer mt-4", loading && "py-1.5")}>
              <h1 className={classnames(loading && "hidden")}>ถัดไป</h1>
              <Loader className={classnames("w-[2.1rem] h-7", !loading && "hidden")}/>
            </Button>
          </div>
        </form>
      </ContentBox>
    </motion.div>
  )
}