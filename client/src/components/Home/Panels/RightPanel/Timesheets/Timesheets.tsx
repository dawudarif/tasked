import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ALL_TIME_RECORDS } from '../../../../../graphql/Timesheets/query';
import { ITime } from '../../../../../util/types';
import Today from '../../../../common/Today';
import { format, parseISO } from 'date-fns';
import TimeChart from './TimeChart';

type TimesheetsProps = {};

const Timesheets: React.FC<TimesheetsProps> = () => {
  const [time, setTime] = useState(0);
  const [active, setIsActive] = useState(false);
  const [chartData, setChartData] = useState<any>([
    { id: 'Loading...', data: [{ x: 0, y: 0 }] },
  ]);
  const { data } = useQuery(ALL_TIME_RECORDS);

  useEffect(() => {
    if (data) {
      const mappedData = data.getAllTimeRecords.slice(-7).map((c: ITime) => {
        return {
          x: formatDate(c.createdAt),
          y: formatTime(c.time),
        };
      });

      setChartData([{ id: 'time', data: [...mappedData] }]);
    }
  }, [data]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setTime(0);
  };

  const formatDate = (date: string) => {
    const UTCdate = new Date(Number(date)).toISOString();
    const parsedDate = parseISO(UTCdate);
    const year = format(parsedDate, 'yyyy');
    const month = format(parsedDate, 'MM');
    const day = format(parsedDate, 'dd');
    const formattedDate = `${day}/${month}`;
    return formattedDate;
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box>
      <Today />

      <Box width='70%' height='20rem'>
        <TimeChart data={chartData} />
      </Box>

      <h1>Stopwatch</h1>
      <p>{formatTime(time)}</p>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </Box>
  );
};

export default Timesheets;
