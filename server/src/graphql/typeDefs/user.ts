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

  type UserProfile {
    id: ID!
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

  type LogoutUser {
    success: Boolean
    message: String
  }

  type Query {
    userProfile: UserProfile
  }

  type Mutation {
    registerUser(input: RegisterUserInput): UserProfile
    loginUser(input: LoginUserInput): UserProfile
    logoutUser: LogoutUser
  }
`;

export default typeDefs;
