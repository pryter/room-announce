import ContentBox from "@components/common/ContentBox";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {useTask} from "../../contexts/task";
import classnames from "classnames"
import {useEffect, useState} from "react";
import {useSubmit} from "../../hooks/submitForms";
import {useToast} from "@components/common/Toast/ToastContext";
import {request} from "@utils/request";
import {ArrowCircleLeftIcon} from "@heroicons/react/solid";
import {Ellipsis} from "../../vectors/Loaders/Ellipsis";

export const Report = ({ setHide, setRev }) => {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [stdID, setStdID] = useState("")
  const [issue, setIssue] = useState("")

  const {addToast} = useToast()
  const {updateTask} = useTask()

  const submit = async () => {
    const res = await request("report", "submitReport", {name, phone, email, issue, stdID})

    if (res.status) {
      addToast({
        color: "green", icon: "tick", text: "ทางโรงเรียนได้รับคำรายงานแล้ว หลังจากปัญหาถูกแก้แล้วจะมีอีเมลติดต่อกลับไปตามที่อยู่ที่ได้ให้ไว้",
        theme: "modern", title: "รายงานปัญหาสำเร็จ"
      })
      clear()
    }else {
      switch (res.report) {
        case "invalid_data":
          addToast({
            color: "red", icon: "cross", text: "ข้อมูลไม่ถูกต้อง กรุณาลองกรอกใหม่อีกครั้ง",
            theme: "modern", title: "ข้อมูลไม่ถูกต้อง"
          })
          break
        default:
          addToast({
            color: "red", icon: "cross", text: "กรุณาลองกรอกใหม่อีกครั้ง",
            theme: "modern", title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ"
          })
      }
    }
  }

  const {loading, submitFunc} = useSubmit(submit)

  const clear = () => {
    setPhone("")
    setStdID("")
    setEmail("")
    setIssue("")
    setName("")
  }

  const back = () => {
    setRev()
    setHide(false)
    setTimeout(() => {updateTask("stdID")}, 600)
  }

  return (
    <div className="report">
      <ContentBox className="flex flex-col justify-center py-10 px-9 mt-6 space-y-8">
        <div>
          <h1 className="text-2xl text-gray-700">รายงานปัญหา</h1>
        </div>
        <div className="border-b-[1px] border-TUCMC-gray-800 w-16"></div>
        <form onSubmit={submitFunc} className="space-y-3.5">
          <div className="space-y-1">
            <h1 className="text-gray-700">ชื่อ-สกุล</h1>
            <Input updateHandler={setName} value={name} required={true}/>
          </div>
          <div className="space-y-1">
            <h1 className="text-gray-700">เลขประจำตัวนักเรียน</h1>
            <Input updateHandler={setStdID} value={stdID} required={true}/>
          </div>
          <div className="space-y-1">
            <h1 className="text-gray-700">เบอร์โทรศัพท์</h1>
            <Input className="w-10/12" updateHandler={setPhone} value={phone} required={true}/>
          </div>
          <div className="space-y-1">
            <h1 className="text-gray-700">อีเมล</h1>
            <Input updateHandler={setEmail} value={email} required={true}/>
          </div>
          <div className="space-y-1">
            <h1 className="text-gray-700">ปัญหาที่พบ</h1>
            <Input updateHandler={setIssue} value={issue} required={true}/>
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
    </div>
  )
}