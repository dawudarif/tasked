import { gql } from '@apollo/client';

export const TASKS_IN_COLLECTION = gql`
  query allTasksInCollection($input: AllTasksInCollectionArgs) {
    allTasksInCollection(input: $input) {
      body
      completed
      createdAt
      id
      updatedAt
      collectionId
    }
  }
`;
