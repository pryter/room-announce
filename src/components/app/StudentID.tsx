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

const Loader = ({...restProps}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto"}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...restProps}>
    <defs>
      <filter id="ldio-s15zlr1i53b-filter" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3"></feGaussianBlur>
        <feComponentTransfer result="cutoff">
          <feFuncA type="linear" slope="60" intercept="-40"></feFuncA>
        </feComponentTransfer>
      </filter>
    </defs>
    <g filter="url(#ldio-s15zlr1i53b-filter)">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="3.0303030303030303s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
      <g>
        <g transform="translate(50 20)">
          <circle cx="0" cy="0" r="0" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
        </g>
        <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.7666666666666666 0 0.6666666666666666 1" repeatCount="indefinite"></animateTransform>
      </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="1" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.7333333333333333 0 0.6333333333333333 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="2" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.7 0 0.6 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="3" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.6666666666666666 0 0.5666666666666667 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="4" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.6333333333333333 0 0.5333333333333333 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="5" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.6 0 0.5 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="6" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.5666666666666667 0 0.4666666666666667 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="7" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.5333333333333333 0 0.43333333333333335 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="8" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.5 0 0.4 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="9" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.4666666666666667 0 0.36666666666666664 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="10" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.43333333333333335 0 0.3333333333333333 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="11" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.4 0 0.3 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="12" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.3666666666666667 0 0.26666666666666666 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="13" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.33333333333333337 0 0.23333333333333334 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="14" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.30000000000000004 0 0.2 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="15" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.26666666666666666 0 0.16666666666666666 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="16" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.23333333333333334 0 0.13333333333333333 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="17" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.2 0 0.1 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="18" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.16666666666666669 0 0.06666666666666667 1" repeatCount="indefinite"></animateTransform>
    </g><g>
      <g transform="translate(50 20)">
        <circle cx="0" cy="0" r="19" fill="rgba(107, 114, 128, 0.9570967741935483)" transform="scale(0.5)"></circle>
      </g>
      <animateTransform attributeName="transform" calcMode="spline" type="rotate" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102" keySplines="0.13333333333333333 0 0.03333333333333333 1" repeatCount="indefinite"></animateTransform>
    </g>
    </g>
  </svg>
}
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
                    disabled={loading}
                    className={classnames("absolute w-11 h-11 rounded-full flex items-center justify-center top-0 right-0 cursor-pointer", loading ? "" : "bg-TUCMC-pink-400")}>
              <ChevronRightIcon className={classnames("w-5 h-5 text-white", loading && "hidden")}/>
              <Loader className={classnames("w-9 h-9" ,!loading && "hidden")}/>
            </Button>
          </div>
        </form>
      </ContentBox>
    </motion.div>
  )
}