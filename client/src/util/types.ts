export interface IUserProfile {
  userProfile: {
    id: string;
    email: string;
    username: string;
    name: string;
  };
}

export interface ILoginArgs {
  input: {
    email: string;
    password: string;
  };
}
export interface ILoginResponse {
  loginUser: {
    email: string;
    name: string;
    username: string;
  };
}

export interface ILogoutUser {
  logoutUser: { message: string; success: boolean };
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
}

export interface ICollection {
  getAllCollections: Array<ICollectionItem>;
}

export interface ICreateTask {
  createTask: ITask;
}

export interface ICreateTaskArgs {
  input: {
    collectionId: string;
    body: string;
  };
}

export interface ITask {
  body: string;
  completed: boolean;
  createdAt: string;
  collectionId: string;
  id: string;
  updatedAt: string;
}

export interface IGetTasks {
  allTasksInCollection: Array<ITask>;
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
}

export interface ICreateCollection {
  createCollection: {
    createdAt: string;
    id: string;
    name: string;
    color: string;
    icon: number;
    updatedAt: string;
  };
}

export interface ICreateCollectionArgs {
  input: {
    name: string;
    color: string;
    icon: number;
  };
}

export interface ITime {
  id: string;
  time: number;
  createdAt: string;
  note: string;
  updatedAt: string;
}

export interface ITimesheet {
  getAllTimeRecords: Array<ITime>;
}

export interface ITimeRecord {
  id: string;
  time: number;
  createdAt: string;
  note: string;
  updatedAt: string;
}

export interface IAllTimeRecords {
  getAllTimeRecords: Array<ITimeRecord>;
}

export interface ICreateTimeRecordArgs {
  input: {
    note: string;
    time: number;
  };
}

export interface TimeRecord {
  id: string;
  time: number;
  note: string;
  updatedAt: string;
  createdAt: string;
}

export interface ICreateTimeRecord {
  createTimeRecord: TimeRecord;
}
