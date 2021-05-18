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
import Image from "next/image"

export default function Index() {

  return (
    <TaskProvider>
     <div className="md:flex">
       <div className="flex-shrink hidden md:block w-[431px] relative min-h-screen">
         <Image src="/assets/images/splash.jpg" layout="fill" className="object-cover"/>
       </div>
       <div className="md:mx-auto md:px-6">
         <div className="pt-12 pb-20 space-y-6 px-6 max-w-[405px] mx-auto md:min-w-[405px] md:mt-20">
           <div className="space-y-10">
             <Heading/>
             <StatusBox/>
           </div>
           <StudentID/>
           <Credentials/>
           <Display/>
         </div>
       </div>
     </div>
    </TaskProvider>
  )
}
