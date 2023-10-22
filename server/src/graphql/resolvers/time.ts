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
          note?: string;
          time: number;
        };
      },
      context: GraphQLContext,
    ) => {
      const { prisma } = context;

      if (args.input.note && args.input.time) {
        const newTimeRecord = await prisma.time.create({
          data: {
            createdById: '6533f0d223ec786e72427d04',
            time: args.input.time,
            note: args.input.note,
          },
        });

        return newTimeRecord;
      }
    },
  },
};

export default resolvers;
