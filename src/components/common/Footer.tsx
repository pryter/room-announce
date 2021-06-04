import Router from "next/router";

export const Footer = ({ report, padding= true }) => {

  return (
    <div className={`flex flex-col items-center text-TUCMC-gray-600 ${padding ? "pt-10" : "pt-4"}`}>
      <p>หากพบปัญหาใดในการใช้งานระบบ</p>
      <p>สามารถรายงานปัญหาได้<span onClick={report} className="text-TUCMC-pink-400 underline cursor-pointer">ที่นี่</span></p>
    </div>
  )
}