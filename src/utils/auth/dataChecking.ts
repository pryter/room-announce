import {initialiseDB} from "../firebase-admin";
import {Status, updateStatus} from "../status";
import Cookies from "cookies"
import crypto from "crypto"
import aes256 from "aes256"
import {fixGrammar} from "@utils/text";

const time = 1622854680 * 1000

const getTime = () => {
  return time
}

const getUTC7 = () => {
  const current = new Date().getTime()
  const timeZoneOffset = (new Date().getTimezoneOffset()) * (-1) * (60 * 1000)

  return current - timeZoneOffset + (7 * 60 * 60 * 1000)
}

const isValidStdID = (id: string) => {
  return getUTC7() >= getTime() ? (id.length === 7 || id.length === 5) : id.length === 5

}

const isBetween = (number, min, max) => {
  return number > min && number < max
}

export const checkID = async (req, res) => {

  const initialStatus = Status()
  const body = req.body

  if (!isValidStdID(body.stdID)) return updateStatus(initialStatus, "report", "invalid_stdID")
  const data = await initialiseDB().collection("data").doc(body.stdID).get()
  if (!data.exists) return updateStatus(initialStatus, "report", "missing_stdID")
  const userCred = data.data()

  const hashedLastname = crypto.createHash("SHA256").update(fixGrammar(userCred.lastname)).digest("base64")

  return updateStatus(initialStatus, {status: true, report: "success", data: {stdID: data.id, firstname: userCred.firstname, lastname: hashedLastname}})
}

export const getData = async (req, res) => {
  const initialStatus = Status()
  const body = req.body

  if (!isValidStdID(body.stdID)) return updateStatus(initialStatus, "report", "invalid_stdID")
  const data = await initialiseDB().collection("data").doc(body.stdID).get()
  if (!data.exists) return updateStatus(initialStatus, "report", "missing_stdID")
  const userCred = data.data()
  if (fixGrammar(body.lastname) !== fixGrammar(userCred.lastname)) return updateStatus(initialStatus, "report", "not_matched_lastname")
  if (!isBetween(body.phone.length,8,11)) return updateStatus(initialStatus, "report", "invalid_phone")
  const fpArr = "fp" in userCred ? userCred.fp : []
  const updatedArr = [body.fp ? body.fp : "", ...fpArr]
  await data.ref.update({phone: body.phone, fp: Array.from(new Set(updatedArr))})

  const encrypted = aes256.encrypt(process.env.DATA_KEY, JSON.stringify(userCred))
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const expiresTime = (new Date().getTime()) + 24 * 60 * 60 * 1000;

  cookies.set('prevData', encrypted, {
    httpOnly: true,
    sameSite: 'lax',
    signed: true,
    expires: new Date(expiresTime)
  })

  return updateStatus(initialStatus, {status: true, report: "success", data: userCred})
}

export const fetchPrevData = async (req, res) => {
  const initialStatus = Status()
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const prev = cookies.get("prevData", {signed: true})

  if (!prev) return updateStatus(initialStatus, "report", "missing_cookie")

  const decrypted = await aes256.decrypt(process.env.DATA_KEY, prev)
  if (!decrypted) return updateStatus(initialStatus, "report", "error")
  const parsed = JSON.parse(decrypted)
  if (Object.keys(parsed).length < 10) return updateStatus(initialStatus, "report", "error")

  return updateStatus(initialStatus, {status: true, report: "success", data: parsed})
}