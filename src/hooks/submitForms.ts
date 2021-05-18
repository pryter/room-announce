import {useState} from "react";
import {request} from "@utils/request";

export const useSubmit = (callback) => {
  const [loading, setLoading] = useState(false)

  const submitFunc = async (event) => {
    event.preventDefault()
    const loader = setTimeout(() => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 10000)
    }, 500)

    await callback()

    clearTimeout(loader)
    setLoading(false)
  }

  return {
    loading, submitFunc
  }
}