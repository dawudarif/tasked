import { useLazyQuery } from '@apollo/client';
import { Checkbox, Flex, Stack, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { TASKS_IN_COLLECTION } from '../../../../../graphql/Task/queries';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';
import { IGetTaskArgs, IGetTasks } from '../../../../../util/types';
import Loader from '../../../../Loader';
import { AiOutlinePlus } from 'react-icons/ai';

interface TasksInCollectionProps {
  collectionId: string;
  collectionName: string;
}

const TasksInCollection: React.FC<TasksInCollectionProps> = ({
  collectionId,
  collectionName,
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

  useEffect(() => {
    if (collectionId === '') return;
    getTasks();
  }, [collectionId]);

  if (loading) {
    return (
      <Flex
        justifyContent='center'
        alignItems='center'
        height='20rem'
        width='100%'
      >
        <Loader size={60} />;
      </Flex>
    );
  }

  if (!data?.allTasksInCollection) return null;

  return (
    <>
      <Stack justifyContent='center' align='baseline' marginX={8}>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          marginY={4}
          width='100%'
        >
          <Text fontSize='1.5rem' fontWeight={700}>
            {collectionName}
          </Text>
          <Button
            onClick={() => setIsOpen(true)}
            alignItems='center'
            marginX={6}
          >
            <Text>Create Task</Text> <AiOutlinePlus size={35} />
          </Button>
        </Flex>

        {data?.allTasksInCollection.length > 0 ? (
          <Stack
            background='white'
            boxShadow='md'
            justifyContent='center'
            align='baseline'
            width='100%'
            marginY={8}
            rounded='lg'
          >
            {data?.allTasksInCollection.map((item, i) => (
              <Flex
                key={item.id}
                borderBottom={
                  data.allTasksInCollection.length - 1 === i ? 0 : '2px'
                }
                borderColor='#5555'
                paddingX={4}
                paddingY={2}
                gap={4}
                fontSize='1.1rem'
                fontWeight={600}
                width='100%'
              >
                <Checkbox checked={item.completed === true} />
                <Text>{item.body}</Text>
              </Flex>
            ))}
          </Stack>
        ) : (
          <Flex justifyContent='center' alignItems='center' height='20rem'>
            <Text textDecorationStyle='double' fontSize='1.2rem'>
              No Tasks in this collection, create new tasks to view here.
            </Text>
          </Flex>
        )}
      </Stack>
      <CreateTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        collectionId={collectionId}
      />
    </>
  );
};
export default TasksInCollection;
