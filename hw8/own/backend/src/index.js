import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongo from './mongo';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import ChatBox from './resolvers/ChatBox';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Mutation,
    Subscription,
	ChatBox,
	Query,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();
server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
