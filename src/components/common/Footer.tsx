import Router from "next/router";

export const Footer = ({ report }) => {

  return (
    <div className="flex flex-col items-center text-TUCMC-gray-600 pt-10">
      <p>หากพบปัญหาใดในการใช้งานระบบ</p>
      <p>สามารถรายงานปัญหาได้<span onClick={report} className="text-TUCMC-pink-400 underline cursor-pointer">ที่นี่</span></p>
    </div>
  )
}