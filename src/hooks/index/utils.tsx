import React from "react";

export const updateTaskfromSection = (setTasks, section) => {

  if (section === "stdID") {
    setTasks([{title: "กรอกเลขประจำตัวนักเรียน", status: "current"}, {
      title: "กรอกข้อมูลส่วนตัว", status: "pending"
    }, {title: <><p>ดาวน์โหลดตารางสอน</p><p>และเข้ากลุ่มไลน์ห้องเรียน</p></>, status: "pending"}])
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