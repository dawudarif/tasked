import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  req: Request;
  res: Response;
  cookie: any;
  prisma: PrismaClient;
}

export interface LoginUserArgs {
  input: { email: string; password: string };
}

export interface RegisterUserArgs {
  input: { email: string; password: string; name: string; username: string };
}

export interface CreateTaskArgs {
  input: { collectionId: string; body: string };
}

export interface UpdateTaskArgs {
  id: string;
  body: string;
  completed: boolean;
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface ICreateCollectionArgs {
  input: {
    name: string;
    color: string;
    icon: number;
  };
}
