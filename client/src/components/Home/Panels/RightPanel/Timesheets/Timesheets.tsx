import { Box } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Today from '../../../../common/Today';
import { ALL_TIME_RECORDS } from '../../../../../graphql/Timesheets/query';
import { ITime } from '../../../../../util/types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type TimesheetsProps = {};

const Timesheets: React.FC<TimesheetsProps> = () => {
  const [time, setTime] = useState(0);
  const [active, setIsActive] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState<any>([]);
  console.log(chartData);

  const { data } = useQuery(ALL_TIME_RECORDS);

  useEffect(() => {
    if (data) {
      const mappedData = data.getAllTimeRecords.map((c: ITime) => {
        return {
          name: c.createdAt,
          time: formatTime(c.time),
        };
      });
      console.log(mappedData);

      setChartData(mappedData);
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

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box>
      <Today />

      <Box>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart width={300} height={100} data={chartData}>
            <Line
              type='monotone'
              dataKey='time'
              stroke='#8884d8'
              strokeWidth={2}
            />
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
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
