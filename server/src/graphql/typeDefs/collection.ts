import gql from 'graphql-tag';

const typeDefs = gql`
  type Collection {
    id: ID!
    name: String!
    color: String!
    icon: Int!
    tasks: [Task]
    createdBy: User!
    createdAt: String!
    updatedAt: String!
  }

  input CreateCollectionInput {
    name: String!
    color: String!
    icon: Int!
  }

  input UpdateCollectionInput {
    id: ID!
    name: String!
    color: String!
    icon: Int!
  }

  type Query {
    getAllCollections: [Collection]
  }

  type Mutation {
    createCollection(input: CreateCollectionInput): Collection!
    updateCollection(input: UpdateCollectionInput): Collection!
    deleteCollection(input: ID): Collection!
  }
`;

export default typeDefs;
