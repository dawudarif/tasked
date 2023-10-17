import React from 'react';
import Today from '../../../../common/Today';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateCollectionButton from './CreateCollectionButton';
import { GET_ALL_COLLECTIONS } from '../../../../../graphql/Collection/queries';
import { useQuery } from '@apollo/client';
import Loader from '../../../../Loader';
import { ICollection } from '../../../../../util/types';
import Collections from './Collections';

type TodoProps = {};

const Todo: React.FC<TodoProps> = () => {
  const { data, loading, error } = useQuery<ICollection>(GET_ALL_COLLECTIONS);

  return (
    <Box
      background='brand.300'
      borderTopLeftRadius='1rem'
      height='max-content'
      width='100%'
    >
      <Today />
      <CreateCollectionButton />
      <Box>
        {loading ? (
          <Loader size={50} />
        ) : data && data.getAllCollections ? (
          <Collections data={data} />
        ) : (
          error && <Box>{error.message}</Box>
        )}
      </Box>
    </Box>
  );
};
export default Todo;
