import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo'
import Routes from './routes';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch  from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: new createHttpLink({
    fetch,
  }),
  cache: new InMemoryCache(),
})

const Root = () =>  (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )

ReactDOM.hydrate(
  <Root />,
  document.getElementById('app')
);