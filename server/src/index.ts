import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { json } from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import { GraphQLContext } from './types/types';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 4001;
const prisma = new PrismaClient();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const main = async () => {
  await server.start();

  app.use(
    '/graphql',
    cors({
      origin: ['http://localhost:3001'],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQLContext> => {
        const cookie = req.headers.cookie;
        return { req, res, cookie, prisma };
      },
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
  );
  console.log(`Server started at http://localhost:${PORT}/graphql`);
};

main();
