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
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ITask } from '../../util/types';
import { TASKS_IN_COLLECTION } from '../../graphql/Task/queries';

interface UpdateTaskModalProps {
  task: ITask;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const [text, setText] = useState(task.body);

  const [updateTask] = useMutation(UPDATE_TASK, {
    optimisticResponse: {
      __typename: 'Mutation',
      updateTask: {
        id: task.id,
        body: text,
        collectionId: task.collectionId,
        completed: task.completed,
        createdAt: task.createdAt,
        updatedAt: new Date().toISOString(),
        __typename: 'Task',
      },
    } as any,
    update: (cache, mutationResult) => {
      const updateTask = mutationResult.data?.updateTask;

      if (updateTask) {
        const { allTasksInCollection } = cache.readQuery<any>({
          query: TASKS_IN_COLLECTION,
          variables: {
            input: {
              collectionId: task.collectionId,
            },
          },
        });

        const taskIndex = allTasksInCollection.findIndex(
          (t: ITask) => t.id === updateTask.id,
        );

        if (taskIndex > -1) {
          allTasksInCollection[taskIndex] = updateTask;
        }

        cache.writeQuery({
          query: TASKS_IN_COLLECTION,
          variables: {
            input: {
              collectionId: task.collectionId,
            },
          },
          data: {
            allTasksInCollection: [...allTasksInCollection],
          },
        });
      }
    },
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    optimisticResponse: {
      __typename: 'Mutation',
      deleteTask: {
        id: task.id,
        __typename: 'Task',
      },
    },
    update: (cache, mutationResult) => {
      const deletedTask = mutationResult?.data?.deleteTask;

      if (mutationResult) {
        const { allTasksInCollection } = cache.readQuery<any>({
          query: TASKS_IN_COLLECTION,
          variables: {
            input: {
              collectionId: deletedTask.collectionId,
            },
          },
        });

        const updatedTasks = allTasksInCollection.filter(
          (t: ITask) => t.id !== deletedTask.id,
        );

        cache.writeQuery({
          query: TASKS_IN_COLLECTION,
          variables: {
            input: {
              collectionId: deletedTask.collectionId,
            },
          },
          data: {
            allTasksInCollection: updatedTasks,
          },
        });
      }
    },
  });

  const handleUpdateTask = () => {
    if (text === '' || task.id === '') return;
    updateTask({
      variables: {
        input: {
          body: text,
          id: task.id,
        },
      },
    });
    onClose();
  };

  const handleDeleteTask = () => {
    deleteTask({
      variables: {
        input: task.id,
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
            <Button
              border='2px'
              borderColor='red.900'
              color='red.900'
              background='white'
              mx={2}
              onClick={() => handleDeleteTask()}
            >
              <RiDeleteBin6Line color='red.900' size={25} />
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
