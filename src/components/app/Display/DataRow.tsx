import classnames from "classnames"

export const DataRow = ({data}) => {
  return (
    <div className={classnames((typeof data.title === "string" && typeof data.context !== "string") ? "space-y-1.5" : "flex space-x-2")}>
      {typeof data.title !== "string" ? data.title.map((item, index) => {
        return <div className="flex" key={`child1-${index}`}>
          <h1 className="text-gray-700 font-medium">{item}</h1>
          <h1 className="text-TUCMC-gray-600 ml-2.5 mr-1.5">{data.context[index]}</h1>
        </div>
      }): <>
        <h1 className="text-gray-700 font-medium">{data.title}</h1>
        {typeof data.context === "string" ? <h1 className="text-TUCMC-gray-600">{data.context}</h1> : <div className="space-y-1">{data.context.map((context, index) => {
          return <p key={`child-${index}`} className="text-TUCMC-gray-600">{context}</p>
        })}</div>}
      </> }
    </div>
  )
}