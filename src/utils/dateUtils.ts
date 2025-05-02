import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const formatFullDate = (): string => {
  return dayjs().format("dddd, DD [de] MMMM [de] YYYY");
};

export const formatTime = (): string => {
  return dayjs().format("HH:mm");
};

export const getTimeDifferenceInMinutes = (
  time1: string,
  time2: string
): number => {
  const date1 = dayjs(`2023-01-01 ${time1}`);
  const date2 = dayjs(`2023-01-01 ${time2}`);
  return date2.diff(date1, "minute");
};

export const isTimeBetween = (startTime: string, endTime: string): boolean => {
  const now = dayjs().format("HH:mm");
  return now >= startTime && now <= endTime;
};

export const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${mins}min`;
  } else {
    return `${mins}min`;
  }
};
