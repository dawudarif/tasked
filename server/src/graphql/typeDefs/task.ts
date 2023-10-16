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

  type DeleteTaskOutput {
    success: Boolean
    message: String
  }

  type Query {
    getAllTasks: [Task]
  }

  type Mutation {
    createTask(input: CreateTaskInput): Task
    updateTask(input: UpdateTaskInput): Task
    deleteTask(input: ID): DeleteTaskOutput
  }
`;

export default typeDefs;
