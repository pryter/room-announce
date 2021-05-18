import {ChevronRightIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion";

const Button = ({ children, className = "absolute bg-TUCMC-pink-400 w-11 h-11 rounded-full flex items-center justify-center top-0 right-0", onClick = () => {}}) => {
  return (
    <motion.div onClick={onClick} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className={className}>
      {children}
    </motion.div>
  )
}

export default Button