import {TriamUdom} from "../../vectors/Logo/TriamUdom";

export const Heading = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <TriamUdom className="w-[50px] text-TUCMC-pink-400"/>
      <div className="text-center">
        <h1 className="text-TUCMC-gray-700 font-bold text-[1.95rem]">ระบบประกาศห้องเรียน</h1>
        <h1 className="text-TUCMC-gray-600">โรงเรียนเตรียมอุดมศึกษา ปีการศึกษา 2564</h1>
      </div>
    </div>
  )
}