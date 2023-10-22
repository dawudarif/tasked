import userResolvers from './user';
import taskResolvers from './task';
import collectionResolvers from './collection';
import timeResolvers from './time';
import merge from 'lodash.merge';

const resolvers = merge(
  {},
  userResolvers,
  taskResolvers,
  collectionResolvers,
  timeResolvers,
);

export default resolvers;
