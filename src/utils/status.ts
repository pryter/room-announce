export interface StatusType {
  status: boolean,
  report: string,
  data: {}
}

export const Status = (): StatusType => {
  return {status: false, report: "", data: {}}
}

export const updateStatus = (Status: StatusType, field: "status" | "report" | "data" | {}, data: any = null) => {
  return typeof field === "string" ? {...Status, [field]: data} : {...Status, ...field}
}