import { GraphQLContext } from '../../types/types';
import { getUser } from '../../utils/getUser';

const resolvers = {
  Query: {
    getAllTimeRecords: async (_: any, __: any, context: GraphQLContext) => {
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

        const getAllTimesheets = await prisma.time.findMany({
          where: {
            createdById: findUser.id,
          },
        });

        return getAllTimesheets;
      } catch (error: any) {
        console.log('getAllTimesheets error', error);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createTimeRecord: async (
      _: any,
      args: {
        input: {
          note: string;
          time: number;
        };
      },
      context: GraphQLContext,
    ) => {
      const { prisma, cookie } = context;
      const { note, time } = args.input;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }
        const findUser = await getUser(tokenCookie, prisma);
        if (!findUser) {
          throw new Error('User not found');
        }

        if (!time || !note) {
          throw new Error('Necessary data not provided');
        }

        const newTimeRecord = await prisma.time.create({
          data: {
            createdById: findUser.id,
            time,
            note,
          },
        });

        return newTimeRecord;
      } catch (error: any) {
        console.log('createTimeRecord error', error);
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
