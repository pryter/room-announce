const time = 1622854680 * 1000

export const getTime = () => {
  return time
}

export const getUTC7 = () => {
  const current = new Date().getTime()
  const timeZoneOffset = (new Date().getTimezoneOffset()) * (60 * 1000)

  return current + timeZoneOffset + (7 * 60 * 60 * 1000)
}

export const scheduled = (before, after) => {

  const utc7 = getUTC7()

  if (utc7 >= time) return after
  return before
}