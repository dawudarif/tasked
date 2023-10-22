import { gql } from '@apollo/client';

export const ALL_TIME_RECORDS = gql`
  query getAllTimeRecords {
    getAllTimeRecords {
      id
      time
      createdAt
      note
      updatedAt
    }
  }
`;
