import {NextApiRequest, NextApiResponse} from "next";
import {checkID, fetchPrevData, getData} from "@utils/auth/dataChecking";
import Cookies from "cookies"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "checkID": {
          const output = await checkID(req, res)
          res.json(output)
        }break
        case "getData": {
          const output = await getData(req, res)
          res.json(output)
        }break
        case "fetchPrevData": {
          const output = await fetchPrevData(req, res)
          res.json(output)
        }break
        case "destroyCookie": {
          const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
          cookies.set("prevData")
          res.json({status: true, report: "success", data:{}})
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}