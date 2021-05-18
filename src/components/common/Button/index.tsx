import {ChevronRightIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion";
import classnames from "classnames"

interface ButtonProps {
  children,
  className?: string,
  onClick?: () => void,
  type?: "button" | "submit" | "reset" | ""

}

const Button = ({
                  children,
                  className = "absolute bg-TUCMC-pink-400 w-11 h-11 rounded-full flex items-center justify-center top-0 right-0",
                  onClick = () => {
                  }, type = ""
                }: ButtonProps) => {
  return (
    type === "" ? <motion.div onClick={onClick} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className={className}>
        {children}
      </motion.div> :
      <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} type={type}
                     className={classnames(className, "appearance-none outline-none focus:outline-none")}>
        {children}
      </motion.button>
  )
}

export default Button