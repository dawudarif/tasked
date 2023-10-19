import { Interface } from 'readline';

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

export interface ICollectionItem {
  id: string;
  name: string;
  color: string;
  icon: number;
  updatedAt: string;
  createdAt: string;
  __typename: string;
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
    __typename: string;
  };
}

export interface ICreateTaskArgs {
  input: {
    collectionId: string;
    body: string;
  };
}

export interface Task {
  body: string;
  completed: boolean;
  createdAt: string;
  collectionId: string;
  id: string;
  updatedAt: string;
}

export interface IGetTasks {
  allTasksInCollection: Array<Task>;
}
export interface IGetTaskArgs {
  input: { collectionId: string };
}

export interface INewCollection {
  createdAt: string;
  id: string;
  name: string;
  color: string;
  icon: number;
  updatedAt: string;
  __typename: string;
}

export interface ICreateCollection {
  createCollection: {
    createdAt: string;
    id: string;
    name: string;
    color: string;
    icon: number;
    updatedAt: string;
    __typename: string;
  };
}

export interface ICreateCollectionArgs {
  input: {
    name: string;
    color: string;
    icon: number;
  };
}
