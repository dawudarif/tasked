import {
  CreateTaskArgs,
  GraphQLContext,
  UpdateTaskArgs,
} from '../../types/types';
import { getUser } from '../../utils/getUser';

const resolvers = {
  Query: {
    getAllTasks: async (parent: any, args: any, context: GraphQLContext) => {
      const { cookie, prisma } = context;
      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }
        const findUser = await getUser(tokenCookie, prisma);
        if (!findUser) {
          throw new Error('User not found');
        }

        const getAllUserTasks = await prisma.task.findMany({
          where: {
            createdById: findUser.id,
          },
        });

        return getAllUserTasks;
      } catch (error: any) {
        console.log('getAllUserTasks error', error);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createTask: async (
      parent: any,
      args: CreateTaskArgs,
      context: GraphQLContext,
    ) => {
      const { collectionId, createdById, body } = args;
      const { cookie, prisma } = context;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }
        const findUser = await getUser(tokenCookie, prisma);
        if (!findUser) {
          throw new Error('User not found');
        }

        if (collectionId || createdById || body) {
          throw new Error('Necessary data not provided');
        }

        const createTask = await prisma.task.create({
          data: {
            collectionId,
            createdById,
            body,
          },
        });

        return createTask;
      } catch (error: any) {
        console.log('createTask error', error);
        throw new Error(error.message);
      }
    },
    updateTask: async (
      parent: any,
      args: UpdateTaskArgs,
      context: GraphQLContext,
    ) => {
      const { id, body, completed } = args;
      const { cookie, prisma } = context;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }
        const findUser = await getUser(tokenCookie, prisma);

        if (!findUser) {
          throw new Error('User not found');
        }

        const updateTask = await prisma.task.update({
          where: { id },
          data: { body, completed },
        });

        return updateTask;
      } catch (error: any) {
        console.log('updateTask error', error);
        throw new Error(error.message);
      }
    },
    deleteTask: async (
      parent: any,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      const { id } = args;
      const { cookie, prisma } = context;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }
        const findUser = await getUser(tokenCookie, prisma);

        if (!findUser) {
          throw new Error('User not found');
        }

        const deleteTask = await prisma.task.delete({
          where: { id },
        });

        return {
          success: true,
          message: 'Task deleted successfully',
        };
      } catch (error: any) {
        console.log('deleteTask error', error);
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
