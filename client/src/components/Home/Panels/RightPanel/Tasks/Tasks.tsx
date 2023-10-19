import React from 'react';

interface TasksProps {
  collectionId: string | null;
}

const Tasks: React.FC<TasksProps> = ({ collectionId }) => {
  return <div>{collectionId}</div>;
};

export default Tasks;
