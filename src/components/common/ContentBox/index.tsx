import classnames from "classnames"
import {useEffect, useRef} from "react";

const ContentBox = ({ children, className = ""}) => {

  return (
    <div className={classnames("rounded-md bg-white shadow-md w-full", className)}>
      {children}
    </div>
  )
}

export default ContentBox