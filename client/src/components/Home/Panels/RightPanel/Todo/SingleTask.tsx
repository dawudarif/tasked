import { useMutation } from '@apollo/client';
import { ITask } from '../../../../../../types/types';
import { UPDATE_TASK } from '../../../../../graphql/Task/mutations';
import { ALL_TASKS } from '../../../../../graphql/Task/queries';
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
        tasksLength={tasksLength}
        index={index}
        updateCheckbox={updateCheckbox}
      />
    </>
  );
};
export default SingleTask;
