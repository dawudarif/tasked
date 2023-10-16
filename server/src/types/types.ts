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
  collectionId: string;
  createdById: string;
  body: string;
}

export interface UpdateTaskArgs {
  id: string;
  body: string;
  completed: boolean;
}
