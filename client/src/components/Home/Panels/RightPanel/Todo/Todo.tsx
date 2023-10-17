import React from 'react';
import Today from '../../../../common/Today';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateCollectionButton from './CreateCollectionButton';

type TodoProps = {};

const Todo: React.FC<TodoProps> = () => {
  return (
    <Box
      background='brand.300'
      borderTopLeftRadius='1rem'
      border='2px'
      borderColor='red'
      height='100%'
      width='100%'
    >
      <Today />

      <CreateCollectionButton />
    </Box>
  );
};
export default Todo;
