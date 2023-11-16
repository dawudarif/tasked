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
import { CREATE_TASK } from '../../graphql/Task/mutations';
import { TASKS_IN_COLLECTION } from '../../graphql/Task/queries';
import { ICreateTask, ICreateTaskArgs } from '../../../types/types';

interface CreateTaskModalProps {
  collectionId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  collectionId,
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState('');

  const [createTask] = useMutation<ICreateTask, ICreateTaskArgs>(CREATE_TASK, {
    optimisticResponse: {
      __typename: 'Mutation',
      createTask: {
        id: `temp-id-${Math.random().toString(36).substr(2, 9)}`,
        body: text,
        collectionId,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __typename: 'Task',
      },
    } as any,
    update: (cache, mutationResult) => {
      const createTask = mutationResult.data?.createTask;

      if (createTask) {
        const { allTasksInCollection } = cache.readQuery<any>({
          query: TASKS_IN_COLLECTION,
          variables: {
            input: {
              collectionId,
            },
          },
        });

        cache.writeQuery({
          query: TASKS_IN_COLLECTION,
          variables: {
            input: {
              collectionId,
            },
          },
          data: {
            allTasksInCollection: [...allTasksInCollection, createTask],
          },
        });
      }
    },
  });

  const handleCreateTask = () => {
    if (text === '' || collectionId === '' || collectionId === null) return;
    createTask({
      variables: {
        input: {
          collectionId,
          body: text,
        },
      },
    });
    setText('');
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} size={'2xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent mx={1} bg='white' color='black'>
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
            <Button
              onClick={handleCreateTask}
              background='brand.100'
              color='white'
              _hover={{ color: 'black' }}
            >
              Create Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateTaskModal;
