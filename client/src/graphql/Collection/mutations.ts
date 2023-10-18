import { gql } from '@apollo/client';

export const CREATE_COLLECTION = gql`
  mutation Mutation($input: CreateCollectionInput) {
    createCollection(input: $input) {
      id
      name
      icon
      color
      createdAt
      updatedAt
    }
  }
`;
