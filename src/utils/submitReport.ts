import {Status, updateStatus} from "@utils/status";
import {initialiseDB} from "@utils/firebase-admin";

export const submitReport = async (req,res) => {
  const initialStatus = Status()
  const body = req.body

  if (!(body.name && body.stdID && body.phone && body.email && body.issue)) return updateStatus(initialStatus, "report", "invalid_data")
  await initialiseDB().collection("report").add({
    name: body.name,
    stdID: body.stdID,
    phone: body.phone,
    email: body.email,
    issue: body.issue,
    fp: body.fp ? body.fp : "",
    timestamp: new Date().getTime()
  })

  return updateStatus(initialStatus, {status: true, report: "success"})
}