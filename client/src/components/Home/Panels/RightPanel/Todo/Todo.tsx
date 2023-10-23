import React from 'react';
import { ALL_TASKS } from '../../../../../graphql/Task/queries';
import { useQuery } from '@apollo/client';
import { Flex, Box, Text } from '@chakra-ui/react';
import Loader from '../../../../Loader';
import Today from '../../../../common/Today';
import TasksContainer from '../../../../common/TasksContainer';

const Todo: React.FC = () => {
  const { data, loading } = useQuery(ALL_TASKS);

  return (
    <>
      <Box>
        <Today />
        <Flex justifyContent='center' alignItems='center' my={6} width='100%'>
          {data && data?.getAllTasks.length > 0 ? (
            <TasksContainer tasks={data?.getAllTasks} />
          ) : (
            loading && (
              <Flex
                width='100%'
                height='70vh'
                justifyContent='center'
                alignItems='center'
              >
                <Loader size={80} />
              </Flex>
            )
          )}
          {data && data?.getAllTasks.length <= 0 && (
            <Flex
              justifyContent='space-between'
              alignItems='center'
              width='100%'
            >
              <Text fontSize='1.2rem' fontWeight={700}>
                No tasks exist in this collection
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
};
export default Todo;
