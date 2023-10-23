import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPDATE_TASK } from '../../../../../graphql/Task/mutations';
import {
  ALL_TASKS,
  TASKS_IN_COLLECTION,
} from '../../../../../graphql/Task/queries';
import { ITask } from '../../../../../util/types';
import UpdateTaskModal from '../../../../Modal/UpdateTaskModal';
import TaskItem from '../../../../common/TaskItem';

interface SingleTaskProps {
  task: ITask;
  index: number;
  tasksLength: number;
}

const SingleTask: React.FC<SingleTaskProps> = ({
  task,
  index,
  tasksLength,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [updateTask] = useMutation(UPDATE_TASK, {
    update: (cache, mutationResult) => {
      const updateTask = mutationResult.data?.updateTask;

      if (updateTask) {
        const { getAllTasks } = cache.readQuery<any>({
          query: ALL_TASKS,
        });

        const taskIndex = getAllTasks.findIndex(
          (t: ITask) => t.id === updateTask.id,
        );

        if (taskIndex > -1) {
          getAllTasks[taskIndex] = updateTask;
        }

        cache.writeQuery({
          query: ALL_TASKS,
          data: {
            getAllTasks: [...getAllTasks],
          },
        });
      }
    },
  });

  const updateCheckbox = (checked: boolean) => {
    updateTask({
      variables: {
        input: {
          completed: checked,
          id: task.id,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateTask: {
          id: task.id,
          body: task.body,
          collectionId: task.collectionId,
          completed: checked,
          createdAt: task.createdAt,
          updatedAt: new Date().toISOString(),
          __typename: 'Task',
        },
      } as any,
    });
  };

  return (
    <>
      <TaskItem
        task={task}
        setIsOpen={setIsOpen}
        tasksLength={tasksLength}
        index={index}
        updateCheckbox={updateCheckbox}
      />
      <UpdateTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        task={task}
      />
    </>
  );
};
export default SingleTask;
