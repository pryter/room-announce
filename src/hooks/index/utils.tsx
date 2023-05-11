import React from "react";
import {scheduled} from "../../configs/timer";

export const updateTaskfromSection = (setTasks, section) => {

  if (section === "stdID") {
    setTasks([{title: scheduled("กรอกเลขประจำตัวนักเรียน", <><p>กรอกเลขประจำตัวนักเรียน</p><p>หรือ เลขประจำตัวสอบ 6 หลัก</p></>), status: "current"}, {
      title: "กรอกข้อมูลส่วนตัว", status: "pending"
    }, {title: <><p>ตรวจสอบข้อมูล และ</p><p>บันทึกภาพหน้าจอไว้เป็นหลักฐาน</p></>, status: "pending"}])
  }
  if (section === "credentials") {
    setTasks(prev => ([
      {...prev[0], status: "success"},
      {...prev[1], status: "current"},
      {...prev[2], status: "pending"}
    ]))
  }

  if (section === "display") {
    setTasks(prev => ([
      {...prev[0], status: "success"},
      {...prev[1], status: "success"},
      {...prev[2], status: "current"}
    ]))
  }

  if (section === "saved") {
    setTasks(prev => ([
      {...prev[0], status: "success"},
      {...prev[1], status: "success"},
      {...prev[2], status: "success"}
    ]))
  }
}