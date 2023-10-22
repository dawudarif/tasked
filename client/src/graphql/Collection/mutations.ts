import { gql } from '@apollo/client';

export const CREATE_COLLECTION = gql`
  mutation createCollection($input: CreateCollectionInput) {
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

export const UPDATE_COLLECTION = gql`
  mutation updateCollection($input: UpdateCollectionInput) {
    updateCollection(input: $input) {
      color
      createdAt
      icon
      id
      name
      updatedAt
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation deleteCollection($input: ID) {
    deleteCollection(input: $input) {
      color
      createdAt
      icon
      id
      name
      updatedAt
    }
  }
`;
