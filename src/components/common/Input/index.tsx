import Button from "@components/common/Button";

const Input = () => {
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {}}
        className="appearance-none outline-none focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500 block w-full rounded-full px-4 h-11 shadow-sm border-gray-300 placeholder-TUCMC-gray-400"
        placeholder="เลขประจำตัวนักเรียน"
      />
    </div>
  )
}

export default Input