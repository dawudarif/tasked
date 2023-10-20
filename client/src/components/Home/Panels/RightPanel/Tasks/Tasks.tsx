import React, { useState, useEffect } from 'react';
import Today from '../../../../common/Today';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
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
        <Flex
          justifyContent='flex-start'
          alignItems='center'
          my={6}
          marginX={'10'}
        >
          {data &&
            data?.allTasksInCollection.length > 0 &&
            collectionId &&
            collectionName && (
              <TasksInCollection
                data={data}
                collectionId={collectionId}
                collectionName={collectionName}
              />
            )}
          {data && data?.allTasksInCollection.length <= 0 && (
            <>
              <Box>NO Tasks Exist Here</Box>
              <Button onClick={() => setIsOpen(true)}>Create a new task</Button>
            </>
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