import { useMutation } from '@apollo/client';
import {
  Button,
  Checkbox,
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
import { CREATE_COLLECTION } from '../../graphql/Collection/mutations';
import { CREATE_TASK } from '../../graphql/Task/mutations';
import { ICreateTask, ICreateTaskArgs } from '../../util/types';

interface CreateTaskModalProps {
  collectionId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  collectionId,
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState('');

  const [createTask, { data, loading, error }] = useMutation<
    ICreateTask,
    ICreateTaskArgs
  >(CREATE_TASK, {
    variables: {
      input: {
        collectionId,
        body: text,
      },
    },
  });

  const handleCreateTask = () => {
    if (text === '' || collectionId === '') return;
    createTask();
    onClose();
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create Task</ModalHeader>
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
            <Button onClick={handleCreateTask} background='brand.100'>
              Create Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateTaskModal;
