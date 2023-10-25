import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ITask } from '../../../../../../types/types';
import SingleTask from './SingleTask';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';

interface TasksContainerProps {
  tasks: ITask[];
  collectionId?: string;
  collectionName?: string;
}

const TasksContainer: React.FC<TasksContainerProps> = ({
  tasks,
  collectionId,
  collectionName,
}) => {
  return (
    <>
      <Stack
        width={{ lg: '80%', base: '95%' }}
        background='white'
        borderRadius='1rem'
        shadow='lg'
      >
        <Flex
          justifyContent='space-between'
          alignItems='center'
          background='#333333'
          px={6}
          py={3}
          borderTopRadius='1rem'
        >
          <Text fontSize='1.2rem' fontWeight={700} color='white'>
            All Tasks
          </Text>
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
    </>
  );
};
export default TasksContainer;
