import { gql } from '@apollo/client';

export const CREATE_TIME_RECORD = gql`
  mutation createTimeRecord($input: CreateTimeRecordInput) {
    createTimeRecord(input: $input) {
      createdAt
      id
      note
      time
      updatedAt
    }
  }
`;
