import { GraphQLContext, ICreateCollectionArgs } from '../../types/types';
import { getUser } from '../../utils/getUser';

const resolvers = {
  Query: {
    getAllCollections: async (_: any, __: any, context: GraphQLContext) => {
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

        const getAllCollections = await prisma.collection.findMany({
          where: { createdById: findUser.id },
        });

        return getAllCollections;
      } catch (error: any) {
        console.log('getAllCollections error', error);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createCollection: async (
      _: any,
      args: ICreateCollectionArgs,
      context: GraphQLContext,
    ) => {
      const { cookie, prisma } = context;
      const { name, color, icon } = args.input;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }
        const findUser = await getUser(tokenCookie, prisma);

        if (!findUser) {
          throw new Error('User not found');
        }

        if (!name) {
          throw new Error('Necessary fields not provided');
        }

        const createCollection = await prisma.collection.create({
          data: {
            createdById: findUser.id,
            name,
            color,
            icon,
          },
        });

        return createCollection;
      } catch (error: any) {
        console.log('createCollection error', error);
        throw new Error(error.message);
      }
    },
    updateCollection: async (
      _: any,
      args: {
        input: { id: string; name: string; color: string; icon: number };
      },
      context: GraphQLContext,
    ) => {
      const { cookie, prisma } = context;
      const { id, name, icon, color } = args.input;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }
        const findUser = await getUser(tokenCookie, prisma);

        if (!findUser) {
          throw new Error('User not found');
        }

        if (!name) {
          throw new Error('Necessary fields not provided');
        }

        const updateCollection = await prisma.collection.update({
          where: {
            id,
          },
          data: {
            name,
            icon,
            color,
          },
        });

        return updateCollection;
      } catch (error: any) {
        console.log('updateCollection error', error);
        throw new Error(error.message);
      }
    },
    deleteCollection: async (
      parent: any,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      const { cookie, prisma } = context;
      const { id } = args;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          throw new Error('Not authenticated');
        }
        const findUser = await getUser(tokenCookie, prisma);

        if (!findUser) {
          throw new Error('User not found');
        }

        if (!id) {
          throw new Error('Necessary fields not provided');
        }

        const deleteCollection = await prisma.collection.delete({
          where: { id },
          include: {
            task: {
              where: {
                collectionId: id,
              },
            },
          },
        });

        return {
          success: true,
          message: 'Collection deleted.',
        };
      } catch (error: any) {
        console.log('deleteCollection error', error);
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
