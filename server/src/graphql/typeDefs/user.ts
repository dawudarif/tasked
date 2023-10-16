import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    username: String
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  type UserProfileOutput {
    name: String!
    email: String!
    username: String!
  }

  input RegisterUserInput {
    name: String!
    email: String!
    username: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type LogoutUserOutput {
    success: Boolean
    message: String
  }

  type Query {
    userProfile: UserProfileOutput
  }

  type Mutation {
    registerUser(input: RegisterUserInput): UserProfileOutput
    loginUser(input: LoginUserInput): UserProfileOutput
    logoutUser(input: LoginUserInput): LogoutUserOutput
  }
`;

export default typeDefs;
