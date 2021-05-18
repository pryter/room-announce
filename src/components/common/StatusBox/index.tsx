import {StatusItem} from "@components/common/StatusBox/StatusItem";
import {useTask} from "../../../contexts/task";

const StatusBox = () => {

  const {tasks} = useTask()

  return (
    <div className="rounded-md border w-full">
      {tasks.map((item, index, arr) => {
        return <StatusItem key={`task-${index}`} taskStatus={item} selfSection={index == 0 ? "top" : index == arr.length - 1 ? "bottom" : "between"} index={index + 1}/>
      })}
    </div>
  )
}

export default StatusBox