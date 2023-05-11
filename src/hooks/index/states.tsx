import React, {useState} from "react";

export const useTaskState = () => {
  return useState([{title: "กรอกเลขประจำตัวนักเรียน", status: "current"}, {
    title: "กรอกข้อมูลส่วนตัว", status: "pending"
  }, {title: <><p>ตรวจสอบข้อมูล และ</p><p>บันทึกภาพหน้าจอไว้เป็นหลักฐาน</p></>, status: "pending"}])
}