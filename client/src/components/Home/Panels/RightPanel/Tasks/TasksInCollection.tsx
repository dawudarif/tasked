import { useLazyQuery } from '@apollo/client';
import { Checkbox, Flex, Stack, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { TASKS_IN_COLLECTION } from '../../../../../graphql/Task/queries';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';
import { IGetTaskArgs, IGetTasks } from '../../../../../util/types';
import Loader from '../../../../Loader';
import { AiOutlinePlus } from 'react-icons/ai';
import SingleTask from './SingleTask';

interface TasksInCollectionProps {
  collectionId: string;
  collectionName: string;
}

const TasksInCollection: React.FC<TasksInCollectionProps> = ({
  collectionId,
  collectionName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [getTasks, { loading, data }] = useLazyQuery<IGetTasks, IGetTaskArgs>(
    TASKS_IN_COLLECTION,
    {
      variables: {
        input: {
          collectionId,
        },
      },
    },
  );

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
            border='2px'
            borderColor='#5555'
          >
            {data?.allTasksInCollection.map((item, i) => (
              <SingleTask
                item={item}
                key={item.id}
                length={data.allTasksInCollection.length}
                itemIndex={i}
              />
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
