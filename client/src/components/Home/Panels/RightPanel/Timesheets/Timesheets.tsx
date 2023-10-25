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
import CreateTimeRecordModal from '../../../../Modal/CreateTimeRecord';

const Timesheets: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [chartData, setChartData] = useState<any>([
    { id: 'Loading...', data: [{ x: 0, y: 0 }] },
  ]);
  const { data, loading, error } = useQuery<IAllTimeRecords>(ALL_TIME_RECORDS);

  useEffect(() => {
    if (data && data?.getAllTimeRecords.length > 0) {
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
    } else {
      setChartData([{ id: 'No Data', data: [{ x: 0, y: 0 }] }]);
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

    return () => clearInterval(interval);
  }, [isActive, time]);

  return (
    <Box>
      <Today />
      <Stack justifyContent='center' alignItems='center' marginY={10}>
        <Text fontSize='1.2rem' fontWeight={700}>
          Stopwatch
        </Text>
        <Heading fontSize={{ lg: '4rem', base: '3rem' }} my={2}>
          {formatTime(time)}
        </Heading>

        <Flex gap={2} flexWrap='wrap' justifyContent='center'>
          <Button onClick={handleStart} bg='#fabb18'>
            <HiPlay size={20} />
          </Button>
          <Button onClick={handlePause}>
            <BsFillPauseFill size={30} />
          </Button>
          <Button onClick={handleReset} bg='#fabb18'>
            <MdOutlineRestartAlt size={30} />
          </Button>
          <Button onClick={() => setIsOpen(true)}>Add a new Record</Button>
        </Flex>
      </Stack>
      <Flex justifyContent='center' alignItems='center' width='100%'>
        <Flex
          width={{ base: '100%', lg: '70%' }}
          height={{ lg: '20rem', base: '15rem' }}
        >
          <TimeChart data={chartData} />
        </Flex>
      </Flex>

      <Flex
        width='100%'
        my={10}
        justifyContent='center'
        alignItems='center'
        minH='20rem'
      >
        {data ? (
          data?.getAllTimeRecords.length > 0 ? (
            <TimeRecordsTable data={data} />
          ) : (
            <Box>NO RECORDS</Box>
          )
        ) : loading ? (
          <Loader size={80} />
        ) : (
          error && <Box>{error.message}</Box>
        )}
      </Flex>
      <CreateTimeRecordModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        time={time}
      />
    </Box>
  );
};

export default Timesheets;
