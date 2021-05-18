import classnames from "classnames"

const ContentBox = ({ children, className = "" }) => {
  return (
    <div className={classnames("rounded-md bg-white shadow-md w-full", className)}>
      {children}
    </div>
  )
}

export default ContentBox