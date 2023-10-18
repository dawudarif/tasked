import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask($input: CreateTaskInput) {
    createTask(input: $input) {
      body
      completed
      createdAt
      collectionId
      id
      updatedAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation Mutation($input: UpdateTaskInput) {
    updateTask(input: $input) {
      completed
      id
      createdAt
      collectionId
      body
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation Mutation($input: ID) {
    deleteTask(input: $input) {
      message
      success
    }
  }
`;
