import userResolvers from './user';
import taskResolvers from './task';
import collectionResolvers from './collection';
import merge from 'lodash.merge';

const resolvers = merge({}, userResolvers, taskResolvers, collectionResolvers);

export default resolvers;
