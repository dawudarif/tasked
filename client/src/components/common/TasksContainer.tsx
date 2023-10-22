import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Task } from '../../util/types';
import CreateTaskModal from '../Modal/CreateTaskModal';
import SingleTask from './SingleTask';

interface TasksContainerProps {
  tasks: Task[];
  collectionId?: string;
  collectionName?: string;
}

const TasksContainer: React.FC<TasksContainerProps> = ({
  tasks,
  collectionId,
  collectionName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Stack width='80%' background='white' borderRadius='1rem' shadow='lg'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          background='#333333'
          px={6}
          py={1}
          borderTopRadius='1rem'
        >
          <Text fontSize='1.2rem' fontWeight={700} color='white'>
            {collectionName ? collectionName : 'All Tasks'}
          </Text>
          {collectionId && (
            <Box
              background='brand.100'
              borderRadius='50%'
              padding={1}
              onClick={() => setIsOpen(true)}
            >
              <AiOutlinePlus size={20} />
            </Box>
          )}
        </Flex>
        {tasks.map((task, i) => (
          <SingleTask
            task={task}
            index={i}
            key={i}
            tasksLength={tasks.length}
          />
        ))}
      </Stack>
      {collectionId && (
        <CreateTaskModal
          collectionId={collectionId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
export default TasksContainer;
