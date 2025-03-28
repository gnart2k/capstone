import { format } from "date-fns";

export const dateToArray = (date: number) => {
  const today = format(date, "HH-mm-ss-dd-MM-yyyy");
  const dateArray = today.split("-").map(date => +date)
  return dateArray
}

