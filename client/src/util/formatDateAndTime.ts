import { parseISO, format } from 'date-fns';

export const formatDate = (date: string) => {
  const UTCdate = new Date(Number(date)).toISOString();
  const parsedDate = parseISO(UTCdate);
  const month = format(parsedDate, 'MM');
  const day = format(parsedDate, 'dd');

  const formattedDate = `${day}/${month}`;
  return formattedDate;
};

export const formatDateLong = (date: string) => {
  const UTCdate = new Date(Number(date)).toISOString();
  const parsedDate = parseISO(UTCdate);
  const year = format(parsedDate, 'yyyy');
  const month = format(parsedDate, 'MM');
  const day = format(parsedDate, 'dd');

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedHours = hours < 10 ? '0' + hours : hours;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
