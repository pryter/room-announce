import {TriamUdom} from "../vectors/Logo/TriamUdom";
import {Heading} from "@components/common/Heading";
import StatusBox from "@components/common/StatusBox";
import ContentBox from "@components/common/ContentBox";
import {StudentID} from "@components/app/StudentID";
import {useEffect, useState} from "react";
import {useTaskState} from "../hooks/index/states";
import {updateTaskfromSection} from "../hooks/index/utils";
import {TaskProvider, useTask} from "../contexts/task";
import {Credentials} from "@components/app/Credentials";
import Display from "@components/app/Display";
import Image from "next/image"
import {request} from "@utils/request";

export default function Index() {

  const [cred, updateCred] = useState({})
  const [display, setDisplay] = useState({})
  const {section, updateTask} = useTask()

  useEffect(() => {
    const fetch = async () => {
      const res = await request("data", "fetchPrevData", {})
      console.log(res)
      if (res.status) {
        setDisplay(res.data)
        updateTask("display")
      }
    }

    fetch()
  },[])

  return (
     <div className="lg:flex">
       <div className="flex-shrink hidden lg:block w-[431px] relative min-h-screen">
         <Image src="/assets/images/splash.jpg" layout="fill" className="object-cover"/>
       </div>
       <div className="lg:mx-auto lg:px-6">
         <div className="pt-12 pb-20 space-y-6 px-6 max-w-[405px] mx-auto lg:min-w-[405px] lg:mt-20">
           <div className="space-y-10">
             <Heading/>
             <StatusBox/>
           </div>
           <StudentID updateCred={updateCred}/>
           <Credentials userCred={cred} setDisplay={setDisplay}/>
           <Display data={display}/>
         </div>
       </div>
     </div>
  )
}
