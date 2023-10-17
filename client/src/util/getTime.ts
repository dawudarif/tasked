import { format } from 'date-fns';

export const getCurrentTime = () => {
  const now = new Date();
  const formattedDate = format(now, 'EEEE, MMMM d, y');
  const hours = format(now, 'HH');
  const minutes = format(now, 'mm');
  const formattedTime = `${hours}:${minutes}`;
  return `${formattedDate} | ${formattedTime}`;
};
