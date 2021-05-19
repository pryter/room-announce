import React, {useContext, useState} from "react";
import Toast from "@components/common/Toast/index";

interface ToastType {
  theme: "default" | "modern"
  icon: "info" | "cross" | "tick",
  title: string,
  text: string | JSX.Element,
  color?: "green" | "yellow" | "red" | "blue",
  lifeSpan?: number,
  crossPage?: boolean
}

interface ToastContext {
  toastData: ToastType | {},
  addToast: (toastData: ToastType) => void
}

export const useToast = () => {
  return useContext(ToastContext)
}
const ToastContext = React.createContext<ToastContext | null>(null)

export const ToastProvider = ({children}) => {
  const toast = toastAction()
  return <ToastContext.Provider value={toast}>
    <Toast/>
    {children}
  </ToastContext.Provider>
}

const toastAction = () => {

  const [toastData, setToastData] = useState({})

  const addToast = (toastData: ToastType) => {
    setToastData(toastData)
  }

  return {
    toastData,
    addToast
  }
}