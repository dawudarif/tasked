import bcrypt from 'bcryptjs';
import { getUser } from '../../utils/getUser';
import { generateToken } from '../../utils/generateToken';
import {
  GraphQLContext,
  LoginUserArgs,
  RegisterUserArgs,
} from '../../types/types';

const resolvers = {
  Query: {
    userProfile: async (_: any, args: any, context: GraphQLContext) => {
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
        return findUser;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    registerUser: async (
      _: any,
      args: RegisterUserArgs,
      context: GraphQLContext,
    ) => {
      const { name, username, email, password } = args.input;

      const { prisma, res } = context;

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          throw new Error('User with this email already exists.');
        }
        if (!email) {
          throw new Error(`email doesn't exist`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
          data: { email, password: hashedPassword, username, name },
        });

        if (res) {
          generateToken(res, user.id);
        } else {
          throw new Error('Response object (res) is undefined.');
        }

        return user;
      } catch (error) {
        console.log('registerUserError', error);
        throw new Error('User registration failed.');
      }
    },
    loginUser: async (_: any, args: LoginUserArgs, context: GraphQLContext) => {
      const { res, prisma } = context;
      const { email, password } = args.input;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new Error('Invalid credentials');
      }
      if (res) {
        generateToken(res, user.id);
      } else {
        throw new Error('Response object (res) is undefined.');
      }

      return user;
    },
    logoutUser: async (_: any, args: any, context: GraphQLContext) => {
      const { res, cookie } = context;

      try {
        const tokenCookie = cookie;
        if (!tokenCookie) {
          // throw new Error('Not authenticated');
          return {
            success: false,
            message: 'Not authenticated',
          };
        }
        if (tokenCookie && res) {
          res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
          });

          return {
            success: true,
            message: 'Logged out successfully.',
          };
        }
      } catch (error) {
        throw new Error('An error occurred, Please try again later.');
      }
    },
  },
};

export default resolvers;
