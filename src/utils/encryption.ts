import crypto from "crypto";

export const encryptAES256 = (key: string, iv: string | Buffer, context: {data: string, encoding: 'base64' | 'utf-8'}): string => {
  const cipher = crypto.createCipheriv("AES-256-CTR", Buffer.from(key, "base64"), typeof iv === "string" ? Buffer.from(iv, 'base64') : iv)
  const encrypt = cipher.update(Buffer.from(context.data, context.encoding))
  return Buffer.concat([encrypt, cipher.final()]).toString("base64")
}