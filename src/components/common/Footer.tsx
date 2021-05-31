import Router from "next/router";

export const Footer = ({ report }) => {

  return (
    <div className="flex flex-col items-center text-TUCMC-gray-600 pt-10">
      <p>นักเรียนสามารถติดตามข้อมูลข่าวสารต่าง ๆ</p>
      <p>ได้บนเว็บไซต์ <a className="text-TUCMC-pink-400 hover:underline" target="_blank" href="https://triamudom.ac.th">โรงเรียนเตรียมอุดมศึกษา</a></p>
    </div>
  )
}