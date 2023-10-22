import gql from 'graphql-tag';

const typeDefs = gql`
  type Task {
    id: ID
    body: String!
    completed: Boolean!
    createdBy: User!
    collectionId: ID!
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
    completed: Boolean
    body: String
  }

  input AllTasksInCollectionArgs {
    collectionId: ID!
  }

  type Query {
    getAllTasks: [Task]
    allTasksInCollection(input: AllTasksInCollectionArgs): [Task]
  }

  type Mutation {
    createTask(input: CreateTaskInput): Task
    updateTask(input: UpdateTaskInput): Task
    deleteTask(input: ID): Task
  }
`;

export default typeDefs;
