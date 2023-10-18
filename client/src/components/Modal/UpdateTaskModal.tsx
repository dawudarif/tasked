import { useMutation } from '@apollo/client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DELETE_TASK, UPDATE_TASK } from '../../graphql/Task/mutations';

interface UpdateTaskModalProps {
  taskBody: string;
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  isOpen,
  onClose,
  taskBody,
  taskId,
}) => {
  const [text, setText] = useState(taskBody);

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleUpdateTask = () => {
    if (text === '' || taskId === '') return;
    updateTask({
      variables: {
        input: {
          body: text,
          id: taskId,
        },
      },
    });
    onClose();
  };

  const handleDeleteTask = () => {
    deleteTask({
      variables: {
        input: taskId,
      },
    });
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} size={'2xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type='text'
              value={text}
              placeholder='Task'
              onChange={(e) => setText(e.target.value)}
              border='2px'
              fontWeight={600}
              fontSize='1.1rem'
              borderColor='#5555'
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mx={2} onClick={() => handleDeleteTask()}>
              Delete Task
            </Button>
            <Button
              onClick={handleUpdateTask}
              background='brand.100'
              color='white'
              _hover={{ color: 'black' }}
            >
              Update Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UpdateTaskModal;
