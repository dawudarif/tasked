import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Mutation($input: RegisterUserInput) {
    registerUser(input: $input) {
      email
      name
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput) {
    loginUser(input: $input) {
      email
      name
      username
    }
  }
`;
