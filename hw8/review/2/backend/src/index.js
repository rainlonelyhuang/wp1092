import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import ChatBox from './resolvers/ChatBox';
import Message from './resolvers/Message';

const uuid = require('uuid')

const mongo = require('./mongo')



const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    ChatBox,
    Subscription,
    Message,
    
  },
  context: {
    db,
    pubsub,
  },
});


mongo.connect();
server.start({ port: process.env.PORT | 8080 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 8080}!`);
});

