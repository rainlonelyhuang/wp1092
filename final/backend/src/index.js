import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import mongo from './mongo';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Point from './resolvers/Point';


//import Subscription from './resolvers/Subscription';


const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Post,
    Comment,
    Point
    //Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

// console.log(db);
mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
