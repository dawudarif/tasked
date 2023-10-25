import { Stack, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getCurrentTime } from '../../util/getTime';

const Today = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Stack alignItems='baseline' margin={{ lg: '8', base: '4' }}>
      <Heading fontSize={{ lg: '3rem', base: '2rem' }}>Today</Heading>
      <Text
        textTransform='capitalize'
        paddingRight={4}
        fontSize={{ lg: '1.2rem', base: '1rem' }}
        fontWeight={600}
      >
        {currentTime}
      </Text>
    </Stack>
  );
};

export default Today;
