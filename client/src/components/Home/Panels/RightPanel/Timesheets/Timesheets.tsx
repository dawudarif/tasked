import { useQuery } from '@apollo/client';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ALL_TIME_RECORDS } from '../../../../../graphql/Timesheets/query';
import { formatDate, formatTime } from '../../../../../util/formatDateAndTime';
import { IAllTimeRecords, ITime } from '../../../../../util/types';
import Today from '../../../../common/Today';
import TimeChart from './TimeChart';
import { MdOutlineRestartAlt } from 'react-icons/md';
import { HiPlay } from 'react-icons/hi2';
import { BsFillPauseFill } from 'react-icons/bs';
import TimeRecordsTable from './TimeRecordsTable';
import Loader from '../../../../Loader';

type TimesheetsProps = {};

const Timesheets: React.FC<TimesheetsProps> = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [chartData, setChartData] = useState<any>([
    { id: 'Loading...', data: [{ x: 0, y: 0 }] },
  ]);
  const { data, loading } = useQuery<IAllTimeRecords>(ALL_TIME_RECORDS);

  useEffect(() => {
    if (data) {
      const sortedData = data.getAllTimeRecords.sort(
        (a, b) => Number(a.createdAt) - Number(b.createdAt),
      );
      const newMappedData = sortedData.slice(-7).map((c: ITime) => {
        return {
          x: formatDate(c.createdAt),
          y: formatTime(c.time),
        };
      });
      setChartData([{ id: 'time', data: [...newMappedData] }]);
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
    setIsActive(false);
  };

  useEffect(() => {
    let interval: any;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [isActive, time]);

  return (
    <Box>
      <Today />
      <Stack justifyContent='center' alignItems='center' marginY={10}>
        <Text fontSize='1.2rem' fontWeight={700}>
          Stopwatch
        </Text>
        <Heading fontSize='4rem' my={2}>
          {formatTime(time)}
        </Heading>
        <Flex gap={2}>
          <Button onClick={handleStart} bg='#fabb18'>
            <HiPlay size={20} />
          </Button>
          <Button onClick={handlePause}>
            <BsFillPauseFill size={30} />
          </Button>
          <Button onClick={handleReset} bg='#fabb18'>
            <MdOutlineRestartAlt size={30} />
          </Button>
          <Button onClick={handleReset}>Add a new Record</Button>
        </Flex>
      </Stack>
      <Flex justifyContent='center' alignItems='center' width='100%'>
        <Box width='70%' height='20rem'>
          <TimeChart data={chartData} />
        </Box>
      </Flex>

      <Flex
        width='100%'
        my={10}
        justifyContent='center'
        alignItems='center'
        minH='20rem'
      >
        {data ? (
          <TimeRecordsTable data={data} />
        ) : (
          loading && <Loader size={80} />
        )}
      </Flex>
    </Box>
  );
};

export default Timesheets;
