import { Flex, Checkbox, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Task } from '../../../../../util/types';
import UpdateTaskModal from '../../../../Modal/UpdateTaskModal';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../../../../../graphql/Task/mutations';

interface SingleTaskProps {
  task: Task;
  index: number;
  tasksLength: number;
}

const SingleTask: React.FC<SingleTaskProps> = ({
  task,
  index,
  tasksLength,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateTask] = useMutation(UPDATE_TASK);

  const updateCheckbox = (checked: boolean) => {
    updateTask({
      variables: {
        input: {
          completed: checked,
          id: task.id,
        },
      },
    });
  };

  return (
    <>
      <Flex
        key={task.id}
        justifyContent='flex-start'
        alignItems='center'
        gap={4}
        borderBottom='2px'
        borderColor={tasksLength - 1 > index ? '#5555' : 'transparent'}
        padding={1}
        px={2}
        cursor='pointer'
        onDoubleClick={() => setIsOpen(true)}
      >
        <Checkbox
          isChecked={task.completed}
          size='lg'
          iconSize='2rem'
          onChange={() =>
            updateCheckbox(task.completed === true ? false : true)
          }
        />

        <Text fontSize='1rem' fontWeight={600}>
          {task.body}
        </Text>
      </Flex>
      <UpdateTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        taskId={task.id}
        taskBody={task.body}
      />
    </>
  );
};
export default SingleTask;
