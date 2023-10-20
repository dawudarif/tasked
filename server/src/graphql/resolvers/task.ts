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
    allTasksInCollection: async (
      _: any,
      args: { input: { collectionId: string } },
      context: GraphQLContext,
    ) => {
      const { cookie, prisma } = context;
      const { collectionId } = args.input;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }

        const findUser = await getUser(tokenCookie, prisma);
        if (!findUser) {
          throw new Error('User not found');
        }

        const allTasksInCollection = await prisma.task.findMany({
          where: {
            createdById: findUser.id,
            collectionId,
          },
        });

        return allTasksInCollection;
      } catch (error: any) {
        console.log('allTasksInCollection error', error);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createTask: async (
      _: any,
      args: CreateTaskArgs,
      context: GraphQLContext,
    ) => {
      const { collectionId, body } = args.input;
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

        if (!collectionId || !body) {
          throw new Error('Necessary data not provided');
        }

        const createTask = await prisma.task.create({
          data: {
            collectionId,
            createdById: findUser.id,
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
      _: any,
      args: UpdateTaskArgs,
      context: GraphQLContext,
    ) => {
      const { id, body, completed } = args.input;
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
      _: any,
      args: { input: string },
      context: GraphQLContext,
    ) => {
      const taskId = args.input;
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

        await prisma.task.delete({
          where: { id: taskId },
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
