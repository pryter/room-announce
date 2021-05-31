import {TriamUdom} from "../../vectors/Logo/TriamUdom";

export const Heading = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <TriamUdom className="w-[50px] text-TUCMC-pink-400"/>
      <div className="text-center">
        <h1 className="text-TUCMC-gray-700 font-bold text-[1.95rem]">ระบบประกาศห้อง ZOOM</h1>
        <h1 className="text-TUCMC-gray-600">สำหรับงาน PAE โรงเรียนเตรียมอุดมศึกษา</h1>
      </div>
    </div>
  )
}