export interface IUserProfile {
  userProfile: {
    id: string;
    email: string;
    username: string;
    name: string;
  };
}

export interface IPanelItem {
  id: number;
  name: string;
  icon: JSX.Element;
}

interface ICollectionItem {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
export interface ICollection {
  getAllCollections: Array<ICollectionItem>;
}

export interface ICreateTask {
  createTask: {
    body: string;
    completed: boolean;
    createdAt: '1697562816262';
    id: string;
    updatedAt: string;
  };
}

export interface ICreateTaskArgs {
  input: {
    collectionId: string;
    body: string;
  };
}

interface Task {
  body: string;
  completed: boolean;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface IGetTasks {
  allTasksInCollection: Array<Task>;
}
export interface IGetTaskArgs {
  input: { collectionId: string };
}
