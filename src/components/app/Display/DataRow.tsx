import classnames from "classnames"

export const DataRow = ({data}) => {
  return (
    <div className={classnames(!(typeof data.title === "string" && typeof data.context !== "string") ? "flex space-x-2" : "space-y-1.5")}>
      {typeof data.title !== "string" ? data.title.map((item, index) => {
        return <>
          <h1 className="text-gray-700 font-medium">{item}</h1>
          <h1 className="text-TUCMC-gray-600 px-1.5">{data.context[index]}</h1>
        </>
      }): <>
        <h1 className="text-gray-700 font-medium">{data.title}</h1>
        {typeof data.context === "string" ? <h1 className="text-TUCMC-gray-600">{data.context}</h1> : <div className="space-y-1">{data.context.map(context => {
          return <p className="text-TUCMC-gray-600">{context}</p>
        })}</div>}
      </> }
    </div>
  )
}