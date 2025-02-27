import dayjs from "dayjs";

export const DateTransfer = (date?: string | Date) => {
  return dayjs(date).format("DD/MM/YYYY");
}