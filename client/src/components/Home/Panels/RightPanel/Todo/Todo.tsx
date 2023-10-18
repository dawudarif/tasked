import React, { useState } from 'react';
import Today from '../../../../common/Today';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateCollectionButton from './CreateCollectionButton';
import { GET_ALL_COLLECTIONS } from '../../../../../graphql/Collection/queries';
import { useQuery } from '@apollo/client';
import Loader from '../../../../Loader';
import { ICollection } from '../../../../../util/types';
import Collections from './Collections';
import TasksInCollection from './TasksInCollection';

type TodoProps = {};

const Todo: React.FC<TodoProps> = () => {
  const { data, loading, error } = useQuery<ICollection>(GET_ALL_COLLECTIONS);
  const [selected, setSelected] = useState('');
  const [collectionName, setCollectionName] = useState('');

  const handleSelect = (collectionId: string, collectionName: string) => {
    setSelected(collectionId);
    setCollectionName(collectionName);
  };

  return (
    <Box
      background='brand.300'
      borderTopLeftRadius='2rem'
      minHeight='100vh'
      height='max-context'
      width='100%'
      paddingTop={4}
    >
      <Today />
      <CreateCollectionButton />
      <Box>
        {loading ? (
          <Flex
            justifyContent='center'
            alignItems='center'
            width='100%'
            height='10rem'
          >
            <Loader size={50} />
          </Flex>
        ) : data && data.getAllCollections ? (
          <Collections
            data={data}
            selected={selected}
            setSelected={handleSelect}
          />
        ) : (
          error && <Box>{error.message}</Box>
        )}
      </Box>

      <TasksInCollection
        collectionId={selected}
        collectionName={collectionName}
      />
    </Box>
  );
};
export default Todo;
