import gql from 'graphql-tag';

const typeDefs = gql`
  type Time {
    id: ID!
    time: Int!
    note: String
    createdBy: User!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTimeRecordInput {
    note: String!
    time: Int!
  }

  type Query {
    getAllTimeRecords: [Time]
  }

  type Mutation {
    createTimeRecord(input: CreateTimeRecordInput): Time!
  }
`;

export default typeDefs;
