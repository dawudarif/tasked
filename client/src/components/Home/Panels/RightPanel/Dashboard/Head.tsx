import Today from '../../../../common/Today';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Head = () => {
  const router = useNavigate();

  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Today />
      <Flex
        justifyContent='center'
        alignItems='center'
        gap={2}
        background='white'
        borderRadius='1.5rem'
        paddingY={4}
        paddingX={10}
        height='max-content'
        width='max-content'
        marginTop={6}
        shadow='md'
        cursor='pointer'
        onClick={() => router('/?menu=timesheets')}
      >
        <Heading fontSize='1.2rem'>Start Time Tracker</Heading>
        <Box
          borderRadius='50%'
          background='brand.100'
          color='black'
          padding='.5rem'
        >
          <BsFillPlayFill size={30} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Head;
