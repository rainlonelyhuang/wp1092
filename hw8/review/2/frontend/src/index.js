import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import { onError } from 'apollo-link-error'
import { ApolloLink } from '@apollo/client';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/',
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/`,
  options: { reconnect: true },
});



const link = split(
 // split based on operation type
 ({ query }) => {
   const definition = getMainDefinition(query);
   return (
     definition.kind === 'OperationDefinition' &&
     definition.operation === 'subscription'
   );
 },
 wsLink,
 httpLink,
);

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const client = new ApolloClient({
  link:ApolloLink.from([errorLink,  link]),
  cache: new InMemoryCache().restore({})
});
ReactDOM.render(

    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
,
  document.getElementById('root'),
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
