export function getTodayIsoString() {
  return dateToIsoString(new Date())
}

function dateToIsoString(date: Date) {
  return date.toISOString().split("T")[0]
}
