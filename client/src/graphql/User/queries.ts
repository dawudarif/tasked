import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query Query {
    userProfile {
      id
      email
      name
      username
    }
  }
`;
