import {useState} from "react";

export const useTaskState = () => {
  return useState([{title: "กรอกเลขประจำตัวนักเรียน", status: "current"}, {
    title: "กรอกข้อมูลส่วนตัว", status: "pending"
  }, {title: <><p>ดาวน์โหลดตารางสอน</p><p>และเข้ากลุ่มไลน์ห้องเรียน</p></>, status: "pending"}])
}