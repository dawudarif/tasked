import React, { useState, useEffect } from 'react';
import Today from '../../../../common/Today';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { TASKS_IN_COLLECTION } from '../../../../../graphql/Task/queries';
import { IGetTasks, IGetTaskArgs } from '../../../../../util/types';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';
import Loader from '../../../../Loader';
import TasksContainer from '../../../../common/TasksContainer';

interface TasksProps {
  collectionId: string | null;
  collectionName: string | null;
}

const Tasks: React.FC<TasksProps> = ({ collectionId, collectionName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [getTasks, { loading, data }] = useLazyQuery<IGetTasks, IGetTaskArgs>(
    TASKS_IN_COLLECTION,
  );

  console.log(data);

  useEffect(() => {
    if (collectionId === '' || collectionId === null) return;
    getTasks({
      variables: {
        input: {
          collectionId,
        },
      },
    });
  }, [collectionId]);

  return (
    <>
      <Box>
        <Today />
        <Flex
          justifyContent='flex-start'
          alignItems='center'
          my={6}
          marginX={'10'}
        >
          {data &&
          data?.allTasksInCollection &&
          data?.allTasksInCollection.length > 0
            ? collectionId &&
              collectionName && (
                <TasksContainer
                  tasks={data?.allTasksInCollection}
                  collectionId={collectionId}
                  collectionName={collectionName}
                />
              )
            : loading && (
                <Flex
                  width='100%'
                  height='70vh'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Loader size={80} />
                </Flex>
              )}
          {data && data?.allTasksInCollection.length <= 0 && (
            <Flex
              justifyContent='space-between'
              alignItems='center'
              width='100%'
            >
              <Text fontSize='1.2rem' fontWeight={700}>
                No tasks exist in this collection
              </Text>
              <Button onClick={() => setIsOpen(true)} colorScheme='yellow'>
                Create a new task
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
      <CreateTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        collectionId={collectionId}
      />
    </>
  );
};

export default Tasks;
