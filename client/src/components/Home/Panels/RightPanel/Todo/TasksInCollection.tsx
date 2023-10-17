import { useLazyQuery } from '@apollo/client';
import { Box, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { TASKS_IN_COLLECTION } from '../../../../../graphql/Task/queries';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';
import { IGetTaskArgs, IGetTasks } from '../../../../../util/types';
import Loader from '../../../../Loader';

interface TasksInCollectionProps {
  collectionId: string;
}

const TasksInCollection: React.FC<TasksInCollectionProps> = ({
  collectionId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [getTasks, { loading, data, error }] = useLazyQuery<
    IGetTasks,
    IGetTaskArgs
  >(TASKS_IN_COLLECTION, {
    variables: {
      input: {
        collectionId,
      },
    },
  });
  console.log(data, error);

  useEffect(() => {
    if (collectionId === '') return;
    getTasks();
  }, [collectionId]);

  if (loading) return <Loader size={40} />;

  return (
    <Box>
      <Box>
        <button onClick={() => setIsOpen(true)}>create task</button>
        <CreateTaskModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          collectionId={collectionId}
        />
      </Box>
      <Flex>
        {data?.allTasksInCollection.map((item) => (
          <Box key={item.id}>{item.body}</Box>
        ))}
      </Flex>
    </Box>
  );
};
export default TasksInCollection;
