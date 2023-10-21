import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query userProfile {
    userProfile {
      id
      email
      name
      username
    }
  }
`;
