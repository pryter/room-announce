const time = 1622854680 * 1000

export const getTime = () => {
  return time
}

export const getUTC7 = () => {
  return new Date().getTime()
}

export const scheduled = (before, after) => {

  const utc7 = getUTC7()

  if (utc7 >= time) return after
  return before
}