import { Flex, Checkbox, Text } from '@chakra-ui/react';
import { ITask } from '../../../types/types';

interface TaskItemProps {
  task: ITask;
  setIsOpen?: (boolean: boolean) => void;
  tasksLength: number;
  index: number;
  updateCheckbox: (boolean: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  setIsOpen,
  tasksLength,
  index,
  updateCheckbox,
}) => {
  return (
    <Flex
      key={task.id}
      justifyContent='flex-start'
      alignItems='center'
      gap={4}
      borderBottom='2px'
      borderColor={tasksLength - 1 > index ? '#5555' : 'transparent'}
      padding={1}
      px={6}
      py={2}
      cursor='pointer'
      onDoubleClick={() => {
        setIsOpen && setIsOpen(true);
      }}
    >
      <Checkbox
        isChecked={task.completed}
        size='lg'
        iconSize='2rem'
        onChange={() => updateCheckbox(task.completed === true ? false : true)}
      />

      <Text
        fontSize='1rem'
        fontWeight={600}
        textDecoration={task.completed ? 'line-through' : 'none'}
        color={task.completed ? '#333333a8' : 'black'}
      >
        {task.body}
      </Text>
    </Flex>
  );
};
export default TaskItem;
