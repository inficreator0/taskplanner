import { Exam, Subject } from "./CreateExam/CreateExam"

export const getHrMinSecFromSeconds = (seconds: number) => {
  let remaining = 0
  const hr = Math.floor(seconds / 3600)
  remaining = seconds % 3600
  const min = Math.floor(remaining / 60)
  remaining = remaining % 60

  let ans = ''

  if (hr >= 1) {
    ans = ans + `${hr} hr`
  }

  if (min >= 1) {
    ans = ans + `${min} min `
  }

  return ans + `${remaining} s`
}

export const getDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-In', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export const getDateDifference = (
  date1: Date | string,
  date2: Date | string,
) => {
  const msPerDay = 1000 * 60 * 60 * 24 // Milliseconds in a day

  // Convert input to Date objects and normalize to midnight
  const d1 = new Date(new Date(date1).setHours(0, 0, 0, 0))
  const d2 = new Date(new Date(date2).setHours(0, 0, 0, 0))

  // Get absolute difference and convert to days
  return Math.ceil((d2.getTime() - d1.getTime()) / msPerDay)
}

export const updateDataInForm = (
  key: string,
  value: string | Date | boolean | undefined,
  formObject: any,
) => {
  const keyArray = key.split('.').slice(1, -1)
  const lastKey = key.split('.').slice(-1)[0]

  const updatedObject = { ...formObject }
  let lastObject = updatedObject

  for (key of keyArray) {
    if (!isNaN(+key)) {
      lastObject = lastObject?.[+key]
    } else lastObject = lastObject?.[`${key}`]
  }

  if (!isNaN(+lastKey)) {
    lastObject[+lastKey] = value
  } else lastObject[`${lastKey}`] = value

  return updatedObject
}

export const removeFromForm = (key: string, formObject: any) => {
  const keyArray = key.split('.').slice(1, -1)
  const lastKey = key.split('.').slice(-1)[0]

  const updatedObject = { ...formObject }
  let lastObject = updatedObject

  for (key of keyArray) {
    if (!isNaN(+key)) {
      lastObject = lastObject?.[+key]
    } else lastObject = lastObject?.[`${key}`]
  }

  if (!isNaN(+lastKey)) {
    lastObject?.splice(+lastKey, 1)
  } else delete lastObject[`${lastKey}`]

  return updatedObject
}
