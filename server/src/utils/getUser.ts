import jwt, { JwtPayload } from 'jsonwebtoken';
import { getTokenFromCookie } from './extractToken';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();

export const getUser = async (cookie: string, prisma: PrismaClient) => {
  const token = getTokenFromCookie('jwt', cookie);
  if (token && process.env.JWT_SECRET) {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET,
    )) as JwtPayload;
    const findUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });

    return findUser;
  }
};
