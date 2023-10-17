import { gql } from '@apollo/client';

export const GET_ALL_COLLECTIONS = gql`
  query getAllCollections {
    getAllCollections {
      id
      name
      updatedAt
      createdAt
    }
  }
`;
