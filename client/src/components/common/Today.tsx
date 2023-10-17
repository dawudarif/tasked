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
    <Stack alignItems='baseline' margin={8}>
      <Heading>Today</Heading>
      <Text
        textTransform='capitalize'
        paddingRight={4}
        fontSize='1.2rem'
        fontWeight={600}
      >
        {currentTime}
      </Text>
    </Stack>
  );
};

export default Today;
