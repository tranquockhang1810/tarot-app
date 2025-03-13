import dayjs from "dayjs";

export const GetRemainingDay = (createdAt: string | undefined) => {
  const createdDate = new Date(createdAt || "");
  const expiryDate = new Date(createdDate);
  expiryDate.setDate(expiryDate.getDate() + 3);

  const today = new Date();
  const remainingDays = Math.max(0, expiryDate.getDate() - today.getDate());

  return {
    createdDate: dayjs(createdDate).format("DD/MM/YYYY"), 
    remainingDays
  }
}