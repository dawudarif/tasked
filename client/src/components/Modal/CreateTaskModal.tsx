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
import { TASKS_IN_COLLECTION } from '../../graphql/Task/queries';

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
    optimisticResponse: {
      __typename: 'Mutation',
      createTask: {
        __typename: 'Task',
        id: `temp-id-${Math.random().toString(36).substr(2, 9)}`,
        name: text,
        completed: false,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
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
    if (text === '' || collectionId === '') return;
    createTask();
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} size={'2xl'} isOpen={isOpen}>
        <ModalOverlay />
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
