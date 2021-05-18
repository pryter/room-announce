import {TriamUdom} from "../vectors/Logo/TriamUdom";
import {Heading} from "@components/common/Heading";
import StatusBox from "@components/common/StatusBox";
import ContentBox from "@components/common/ContentBox";
import {StudentID} from "@components/app/StudentID";
import {useEffect, useState} from "react";
import {useTaskState} from "../hooks/index/states";
import {updateTaskfromSection} from "../hooks/index/utils";
import {TaskProvider} from "../contexts/task";
import {Credentials} from "@components/app/Credentials";
import Display from "@components/app/Display";

export default function Index() {


  return (
    <TaskProvider>
      <div className="py-12 space-y-6 px-6 max-w-[400px] mx-auto">
        <div className="space-y-10">
          <Heading/>
          <StatusBox/>
        </div>
        <StudentID/>
        <Credentials/>
        <Display/>
      </div>
    </TaskProvider>
  )
}
