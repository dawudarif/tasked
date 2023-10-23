import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosTimer } from 'react-icons/io';
import Head from './Head';
import { useNavigate } from 'react-router-dom';

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  const router = useNavigate();

  return (
    <Box height='100%' width='100%'>
      <Head />
      <Box
        background='white'
        borderRadius='1.5rem'
        width='max-content'
        marginY={4}
        marginX={8}
        padding={10}
        cursor='pointer'
        shadow='md'
        onClick={() => router('/?menu=timesheets')}
      >
        <Flex justifyContent='center' alignItems='center' gap={4}>
          <Heading fontSize='1.5rem'>Worked this week</Heading>
          <IoIosTimer color='#fabb18' size={50} />
        </Flex>
        <Box>
          <Text _hover={{ color: 'brand.100' }}>View all</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
