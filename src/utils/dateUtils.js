import { addSeconds, format } from "date-fns";
import { Timestamp } from "firebase/firestore";
export function getStartOfDay(dateInMilis) {
  const date = new Date(dateInMilis)
  date.setHours(0, 0, 0, 0);
  const timestamp = Timestamp.fromDate(date);
  return timestamp;
}

export function getEndOfDay(dateInMilis) {
  const date = new Date(dateInMilis)
  date.setHours(23, 59, 59, 999);
  const timestamp = Timestamp.fromDate(date);
  return timestamp;
}


export const getTimeLabel = (time) => {
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  const helperDate = addSeconds(date, Math.floor(time * 60));
  const hours = Math.floor(time / 60);
  return `${hours}:${format(helperDate, "mm:ss")}`;
};