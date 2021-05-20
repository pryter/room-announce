import Button from "@components/common/Button";
import classnames from "classnames"

const Input = ({value = "", updateHandler, placeholder = "", disabled = false, required = false, className = ""}) => {
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          updateHandler(event.target.value)
        }}
        className={classnames("appearance-none outline-none focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 block w-full rounded-full px-4 h-11 shadow-sm border-gray-300 placeholder-TUCMC-gray-400", className, disabled && "cursor-not-allowed pointer-events-none")}
        placeholder={placeholder}
        value={value}
        readOnly={disabled}
        required={required}
      />
    </div>
  )
}

export default Input