import gql from 'graphql-tag';

const typeDefs = gql`
  type Task {
    id: ID
    index: String!
    body: String!
    completed: Boolean!
    createdBy: User!
    collection: Collection!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTaskInput {
    collectionId: String
    createdById: String
    body: String
  }

  input UpdateTaskInput {
    id: ID
    completed: String
    body: String
  }

  input AllTasksInCollectionArgs {
    collectionId: ID!
  }

  type DeleteTask {
    success: Boolean
    message: String
  }

  type Query {
    getAllTasks: [Task]
    allTasksInCollection(input: AllTasksInCollectionArgs): [Task]
  }

  type Mutation {
    createTask(input: CreateTaskInput): Task
    updateTask(input: UpdateTaskInput): Task
    deleteTask(input: ID): DeleteTask
  }
`;

export default typeDefs;
