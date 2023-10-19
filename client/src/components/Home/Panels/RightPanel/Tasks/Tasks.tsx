import React, { useState, useEffect } from 'react';
import Today from '../../../../common/Today';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { TASKS_IN_COLLECTION } from '../../../../../graphql/Task/queries';
import { IGetTasks, IGetTaskArgs } from '../../../../../util/types';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';
import TasksInCollection from './TasksInCollection';

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

  // if (data?.allTasksInCollection.length === 0) return null;

  return (
    <>
      <Box>
        <Today />
        <Box>
          <Heading background='#fad064' width='100%' mt={4} p={4}>
            {collectionName}
          </Heading>
          <Flex justifyContent='flex-start' alignItems='center' m={6}>
            {data && collectionId && (
              <TasksInCollection data={data} collectionId={collectionId} />
            )}
          </Flex>
        </Box>
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
