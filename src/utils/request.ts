import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {Status, StatusType, updateStatus} from "./status";

export const request = async (path: string, action: string, data: {}): Promise<StatusType> => {
  const fp = await FingerprintJS.load()
  const fingerPrint = await fp.get();

  const reqData = {
    action: action,
    fp: fingerPrint.visitorId,
    ...data
  }

  console.log(data)

  try {
    const res = await fetch(`/api/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
      credentials: 'include'
    })

    return await res.json()
  } catch (e) {
    return updateStatus(Status(), "report","unexpected_error")
  }

}