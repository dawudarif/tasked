import { Flex, Checkbox, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Task } from '../../../../../util/types';
import UpdateTaskModal from '../../../../Modal/UpdateTaskModal';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../../../../../graphql/Task/mutations';

interface SingleTaskProps {
  item: Task;
  length: number;
  itemIndex: number;
}

const SingleTask: React.FC<SingleTaskProps> = ({ item, length, itemIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateTask] = useMutation(UPDATE_TASK);

  const updateCheckbox = (checked: boolean) => {
    updateTask({
      variables: {
        input: {
          completed: checked,
          id: item.id,
        },
      },
    });
  };

  return (
    <Flex
      borderBottom={length - 1 === itemIndex ? 0 : '2px'}
      borderColor='#5555'
      paddingX={4}
      paddingY={2}
      gap={4}
      fontSize='1.1rem'
      fontWeight={600}
      cursor='pointer'
      width='100%'
      onDoubleClick={() => setIsOpen(true)}
    >
      <Checkbox
        isChecked={item.completed}
        size='lg'
        iconSize='2rem'
        onChange={() => updateCheckbox(item.completed === true ? false : true)}
      />
      <Text
        as={item.completed ? 'del' : 'a'}
        color={item.completed ? '#2c2a2ac6' : 'black'}
      >
        {item.body}
      </Text>
      <UpdateTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        taskId={item.id}
        taskBody={item.body}
      />
    </Flex>
  );
};
export default SingleTask;
